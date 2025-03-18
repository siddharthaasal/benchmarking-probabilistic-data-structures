import express from "express";
import { isIpBlocked } from "../services/bruteForceBlockedIp.js";

const router = express.Router();

router.get("/is-blocked/:ip", async (req, res) => {
    try {
        const ip = req.params.ip;
        if (!ip) {
            return res.status(400).json({ error: "IP address is required" });
        }

        const blocked = await isIpBlocked(ip);
        res.json({ ip, blocked });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
