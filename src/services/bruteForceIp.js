// ./services/bruteForceIp.js

import pool from "../config/db.js";


export const getUniqueIpCount = async () => {
    try {
        const query = "SELECT COUNT(DISTINCT ip) AS unique_ips FROM ip_logs";
        const result = await pool.query(query);
        return result.rows[0].unique_ips;
    } catch (err) {
        console.error("Error while fetching unique IP count:", err);
        throw err;
    }
};