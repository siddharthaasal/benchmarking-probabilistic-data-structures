import express from "express";
import { getUniqueIpCount } from "../services/bruteForceIp.js";

const router = express.Router();

router.get("/unique-ip-count", async (req, res) => {
    try {
        const uniqueIpCount = await getUniqueIpCount();
        res.json({ uniqueIpCount });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;