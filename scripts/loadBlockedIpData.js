import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../src/config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_PATH = path.resolve(__dirname, "../data/blocked_ips.json");
const BATCH_SIZE = 1000;

const loadBlockedIPs = async () => {
    try {
        console.log("🗑️ Clearing existing blocked IPs...");
        await pool.query("TRUNCATE TABLE blocked_ips RESTART IDENTITY;"); // Reset table
        console.log("✅ Blocked IPs table cleared.");

        const rawData = fs.readFileSync(FILE_PATH);
        const records = JSON.parse(rawData);

        console.log(`📂 Loaded ${records.length} blocked IPs from JSON file.`);

        for (let i = 0; i < records.length; i += BATCH_SIZE) {
            const batch = records.slice(i, i + BATCH_SIZE);

            // Construct parameterized query dynamically
            const values = batch.map((_, idx) => `($${idx + 1})`).join(",");
            const query = `INSERT INTO blocked_ips (ip) VALUES ${values} ON CONFLICT DO NOTHING`;

            const params = batch.map(record => record.ip);

            await pool.query(query, params);
            console.log(`✅ Inserted batch ${i / BATCH_SIZE + 1}/${Math.ceil(records.length / BATCH_SIZE)}`);
        }

        console.log("🚀 Blocked IPs loading complete!");
    } catch (err) {
        console.error("❌ Error while inserting blocked IPs:", err);
    } finally {
        await pool.end();
    }
};

loadBlockedIPs();
