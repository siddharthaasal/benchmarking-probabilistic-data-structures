import fs from "fs";
import path from "path";
import redisClient from "../src/config/redis.js";
import { addIPToBloomFilter } from "../src/services/bloomFilter.js";

const filePath = path.join(process.cwd(), "data", "blocked_ips.json");
const BF_KEY = "blocked_ips_bloom";

const seedBloomFilter = async () => {
    console.log(`🧹 Clearing existing Bloom Filter data...`);

    try {
        await redisClient.del(BF_KEY); // 🔥 Deletes previous Bloom Filter data
        console.log(`✅ Previous Bloom Filter data cleared!`);

        console.log(`🌱 Seeding Bloom Filter with IPs from data.json...`);

        const rawData = fs.readFileSync(filePath);
        const ipRecords = JSON.parse(rawData);

        if (!Array.isArray(ipRecords)) {
            console.error('❌ Invalid data format: Expected an array of objects with "ip" field.');
            process.exit(1);
        }

        for (const record of ipRecords) {
            if (record.ip) {
                await addIPToBloomFilter(record.ip);
            }
        }

        console.log("✅ Seeding complete!");
    } catch (error) {
        console.error("❌ Error reading or processing blocked_ips.json:", error);
    } finally {
        process.exit();
    }
};

seedBloomFilter();
