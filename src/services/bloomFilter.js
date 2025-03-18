import redisClient from "../config/redis.js";

const BLOOM_FILTER_KEY = "blocked_ips_bloom";

/**
 * Adds an IP address to the Bloom filter
 * @param {string} ip - The IP address to be added
 */
export const addIPToBloomFilter = async (ip) => {
    await redisClient.sendCommand(["BF.ADD", BLOOM_FILTER_KEY, ip]);
};

/**
 * Checks if an IP address is *possibly* blocked
 * @param {string} ip - The IP address to check
 * @returns {Promise<boolean>} - True if possibly blocked, False if definitely not blocked
 */
export const isIPPossiblyBlocked = async (ip) => {
    const result = await redisClient.sendCommand(["BF.EXISTS", BLOOM_FILTER_KEY, ip]);
    return result === 1;
};
