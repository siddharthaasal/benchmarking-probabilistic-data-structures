import pool from "../config/db.js";

/**
 * Checks if an IP is blocked using brute-force lookup
 * @param {string} ip - The IP address to check
 * @returns {Promise<boolean>} - True if blocked, False otherwise
 */
export const isIpBlocked = async (ip) => {
    try {
        const query = "SELECT EXISTS(SELECT 1 FROM blocked_ips WHERE ip = $1) AS is_blocked";
        const result = await pool.query(query, [ip]);
        return result.rows[0].is_blocked;
    } catch (err) {
        console.error("❌ Error checking blocked IP:", err);
        throw err;
    }
};
