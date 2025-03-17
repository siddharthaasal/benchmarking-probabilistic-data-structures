import axios from "axios";
import redisClient from "../../config/redis.js";
import pgClient from "../../config/db.js";

const BASE_URL = "http://localhost:3000"; // Change if needed

// Helper function to measure API response time
const measureAPI = async (endpoint) => {
    const startTime = Date.now();
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    const duration = Date.now() - startTime;

    return { data: response.data, duration };
};

// Run benchmarks
const runBenchmark = async () => {
    console.log("Running benchmarks...");

    // Measure Brute-force API
    const bruteForceResult = await measureAPI("/bruteForce/unique-ip-count");
    console.log(`Brute-force: ${bruteForceResult.duration}ms`, bruteForceResult.data);

    // Measure HLL API
    const hllResult = await measureAPI("/hll/count");
    console.log(`HLL: ${hllResult.duration}ms`, hllResult.data);

    // Calculate accuracy
    const exactCount = Number(bruteForceResult.data.uniqueIpCount);
    console.log(`Exact Count: ${exactCount}`);
    const estimatedCount = Number(hllResult.data.uniqueIpCount);
    console.log(`HLL Count: ${estimatedCount}`);

    const errorRate = ((Math.abs(exactCount - estimatedCount)) / exactCount) * 100;

    console.log(`Accuracy: Exact = ${exactCount}, HLL = ${estimatedCount}, Error Rate = ${errorRate.toFixed(2)} % `);
};

//check memory usage
const checkMemoryUsage = async () => {
    try {
        console.log("🔍 Checking memory usage...");

        // PostgreSQL Query to get table size
        const pgQuery = "SELECT pg_size_pretty(pg_total_relation_size('ip_logs')) AS size";
        const pgResult = await pgClient.query(pgQuery);
        const pgSize = pgResult.rows[0].size;

        // Redis HLL Memory Usage
        const hllMemory = await redisClient.sendCommand(["MEMORY", "USAGE", "unique_ips_hll"]);

        console.log(`🗄️ PostgreSQL Table Size: ${pgSize}`);
        console.log(`📊 HLL Memory Usage: ${hllMemory} bytes`);
    } catch (error) {
        console.error("❌ Error fetching memory usage:", error);
    } finally {
        pgClient.end();
        redisClient.quit();
    }
};

const benchmarkThroughput = async (endpoint, iterations = 1000) => {
    console.log(`Benchmarking ${endpoint} with ${iterations} requests...`);

    const startTime = Date.now();

    const requests = [];
    for (let i = 0; i < iterations; i++) {
        requests.push(axios.get(`${BASE_URL}${endpoint}`));
    }

    await Promise.all(requests); // Execute all requests in parallel
    const duration = Date.now() - startTime;

    console.log(`✅ ${iterations} requests completed in ${duration}ms (${(iterations / (duration / 1000)).toFixed(2)} req/sec)`);
};

// Run throughput benchmark
const runThroughputBenchmark = async () => {
    await benchmarkThroughput("/bruteForce/unique-ip-count", 10);
    await benchmarkThroughput("/hll/count", 10);
};


await checkMemoryUsage();

await runBenchmark();

await runThroughputBenchmark();