import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Change if needed
const TEST_IPS = {
    blocked: ["192.168.177.74", "243.99.4.24"], // These should be actually blocked
    notBlocked: ["172.16.132.76", "243.99.4.25"], // These should not be blocked
};

// 📌 Helper function to measure API response time for brute-force and bloom
const measureBlockedIpCheck = async (ip, method) => {
    const startTime = Date.now();
    const response = await axios.get(`${BASE_URL}/${method}/is-blocked/${ip}`);
    const duration = Date.now() - startTime;

    // Fix: Use `possiblyBlocked` for Bloom filter, `blocked` for Brute-force
    const blockedStatus = method === "bloom" ? response.data.possiblyBlocked : response.data.blocked;

    return { ip, method, blocked: blockedStatus, duration };
};

// 📌 Function to benchmark response time for both brute-force & bloom
const benchmarkBlockedIpCheck = async () => {
    console.log("🔍 Running Blocked IP Check Benchmark...");

    let results = { bruteForce: [], bloom: [] };

    for (const ip of [...TEST_IPS.blocked, ...TEST_IPS.notBlocked]) {
        const bruteForceResult = await measureBlockedIpCheck(ip, "bruteForceBlockedIp");
        console.log(`Brute-force (${ip}): ${bruteForceResult.duration}ms`, bruteForceResult.blocked);
        results.bruteForce.push(bruteForceResult);

        const bloomResult = await measureBlockedIpCheck(ip, "bloom");
        console.log(`Bloom Filter (${ip}): ${bloomResult.duration}ms`, bloomResult.blocked);
        results.bloom.push(bloomResult);
    }

    return results;
};

// 📌 Accuracy Evaluation
const calculateAccuracy = (results) => {
    console.log("\n📊 Evaluating Accuracy of Bloom Filter...");
    let TP = 0, FP = 0, FN = 0;

    results.bloom.forEach((bloomResult) => {
        const actualBlocked = TEST_IPS.blocked.includes(bloomResult.ip);

        if (actualBlocked && bloomResult.blocked) TP++; // Correctly identified as blocked ✅
        else if (!actualBlocked && bloomResult.blocked) FP++; // False positive ❌
        else if (actualBlocked && !bloomResult.blocked) FN++; // False negative ❌
    });

    const totalTests = results.bloom.length;
    const accuracy = ((TP) / (TP + FP + FN)) * 100;
    const falsePositiveRate = (FP / totalTests) * 100;

    console.log(`✅ True Positives (Correctly Blocked): ${TP}`);
    console.log(`❌ False Positives (Mistakenly Blocked): ${FP}`);
    console.log(`❌ False Negatives (Mistakenly Allowed): ${FN}`);
    console.log(`📈 Bloom Filter Accuracy: ${accuracy.toFixed(2)}%`);
    console.log(`⚠️ Bloom Filter False Positive Rate: ${falsePositiveRate.toFixed(2)}%`);
};

// 📌 Benchmark Throughput for Brute-force and Bloom
const benchmarkBlockedIpThroughput = async (method, iterations = 1000) => {
    console.log(`🚀 Benchmarking ${method} with ${iterations} requests...`);

    const startTime = Date.now();
    const requests = [];

    for (let i = 0; i < iterations; i++) {
        const ip = Object.values(TEST_IPS).flat()[i % Object.values(TEST_IPS).flat().length]; // Rotate through test IPs
        requests.push(axios.get(`${BASE_URL}/${method}/is-blocked/${ip}`));
    }

    await Promise.all(requests); // Execute all requests in parallel
    const duration = Date.now() - startTime;

    console.log(`✅ ${method.toUpperCase()} - ${iterations} requests completed in ${duration}ms`);
    console.log(`📊 ${method.toUpperCase()} Throughput: ${(iterations / (duration / 1000)).toFixed(2)} req/sec`);
};

// 📌 Run all benchmarks
const runBenchmark = async () => {
    const results = await benchmarkBlockedIpCheck();
    calculateAccuracy(results);

    await benchmarkBlockedIpThroughput("bruteForceBlockedIp", 100);
    await benchmarkBlockedIpThroughput("bloom", 100);
};

// Execute
runBenchmark();
