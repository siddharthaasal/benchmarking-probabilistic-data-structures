// ./services/bruteForceIp.js

import pool from "../config/db.js";

// export const insertLog = async (ip, timestamp) => {
//     try {
//         const query = "INSERT into ip_logs (ip, timestamp) VALUES ($1, $2)";
//         await pool.query(query, [ip, timestamp]);
//         return result.rowCount; // Returns 1 if successful
//     } catch (err) {
//         console.error("Error in services, while inserting ip: ", err);
//         throw new Error("Database Insertion Failed");;
//     }
// }

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