import express from "express";
import { isIPPossiblyBlocked } from "../services/bloomFilter.js";

const router = express.Router();

router.get("/is-blocked", async (req, res) => {
    const { ip } = req.query;

    if (!ip) {
        return res.status(400).json({ error: "Missing 'ip' query parameter" });
    }

    try {
        const possiblyBlocked = await isIPPossiblyBlocked(ip);
        res.json({ ip, possiblyBlocked });
    } catch (err) {
        console.error("Error checking Bloom filter:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
