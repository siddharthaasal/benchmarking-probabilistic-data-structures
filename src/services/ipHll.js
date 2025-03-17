import redisClient from "../config/redis.js";

const HLL_KEY = 'unique_ips_hll';

/**
 * Adds an IP address to the HyperLogLog set
 * @param {string} ip - The IP address to be added
 */
export const addIPToHLL = async (ip) => {
    await redisClient.pfAdd(HLL_KEY, ip);
};

/**
 * Retrieves the approximate number of unique IPs seen
 * @returns {Promise<number>} - Estimated unique IP count
 */
export const getUniqueIPCount = async () => {
    return await redisClient.pfCount(HLL_KEY);
};