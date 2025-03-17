import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../src/config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_PATH = path.resolve(__dirname, "../data/data.json");
const BATCH_SIZE = 1000;

const loadData = async () => {
    try {
        console.log("🗑️ Clearing existing data...");
        await pool.query("TRUNCATE TABLE ip_logs RESTART IDENTITY;"); // Deletes all rows and resets IDs
        console.log("✅ Table cleared.");

        const rawData = fs.readFileSync(FILE_PATH);
        const records = JSON.parse(rawData);

        console.log(`📂 Loaded ${records.length} records from JSON file.`);

        for (let i = 0; i < records.length; i += BATCH_SIZE) {
            const batch = records.slice(i, i + BATCH_SIZE);

            // Construct parameterized query dynamically
            const values = batch.map((_, idx) => `($${idx * 2 + 1}, $${idx * 2 + 2})`).join(",");
            const query = `INSERT INTO ip_logs (ip, timestamp) VALUES ${values}`;

            const params = batch.flatMap(record => [record.ip, record.timestamp]);

            await pool.query(query, params);
            console.log(`✅ Inserted batch ${i / BATCH_SIZE + 1}/${Math.ceil(records.length / BATCH_SIZE)}`);
        }

        console.log("🚀 Data loading complete!");
    } catch (err) {
        console.error("❌ Error while inserting data:", err);
    } finally {
        await pool.end();
    }
};

loadData();
