import pool from "../src/config/db.js";

async function checkDBConnection() {
    try {
        const res = await pool.query("SELECT * from ip_logs");
        if (res.rowCount > 0) {
            console.log(res);
            console.log("✅ Database connection is active.");
        } else {
            console.log("⚠️ Unexpected response from DB.");
        }
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
    } finally {
        pool.end(); // Close the connection after checking
    }
}

checkDBConnection();
