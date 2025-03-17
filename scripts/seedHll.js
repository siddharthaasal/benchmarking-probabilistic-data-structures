import fs from 'fs';
import path from 'path';
import redisClient from '../src/config/redis.js';
import { addIPToHLL } from '../src/services/ipHll.js';

const filePath = path.join(process.cwd(), 'data', 'data.json');
const HLL_KEY = 'unique_ips_hll';

const seedHLL = async () => {
    console.log(`🧹 Clearing existing HLL data...`);

    try {
        await redisClient.del(HLL_KEY); // 🔥 Deletes previous HLL data
        console.log(`✅ Previous HLL data cleared!`);

        console.log(`🌱 Seeding HLL with IPs from data.json...`);

        const rawData = fs.readFileSync(filePath);
        const ipRecords = JSON.parse(rawData);

        if (!Array.isArray(ipRecords)) {
            console.error('❌ Invalid data format: Expected an array of objects with "ip" field.');
            process.exit(1);
        }

        for (const record of ipRecords) {
            if (record.ip) {
                await addIPToHLL(record.ip);
            }
        }

        console.log('✅ Seeding complete!');
    } catch (error) {
        console.error('❌ Error reading or processing data.json:', error);
    } finally {
        process.exit();
    }
};

seedHLL();
