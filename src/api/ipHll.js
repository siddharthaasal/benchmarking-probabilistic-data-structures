import express from 'express';
import { addIPToHLL, getUniqueIPCount } from '../services/ipHll.js';

const router = express.Router();

// Add an IP to HLL
router.post('/add', async (req, res) => {
    const { ip } = req.body;
    if (!ip) return res.status(400).json({ error: 'IP is required' });

    await addIPToHLL(ip);
    res.json({ message: 'IP added to HLL' });
});

// Get unique IP count
router.get('/count', async (req, res) => {
    const count = await getUniqueIPCount();
    res.json({ uniqueIpCount: count });
});

export default router;
