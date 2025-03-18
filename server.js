import express from "express";
import bruteForceRoutes from "./src/api/bruteForce.js";
import ipHll from "./src/api/ipHll.js";
import bruteForceBlockedIp from "./src/api/bruteForceBlockedIp.js";
import bloomFilterBlockedIp from "./src/api/bloomFilterBlockedIp.js";

const app = express();

const port = 3000;

app.use(express.json());

app.use("/bruteBlocked", bruteForceRoutes);
app.use('/hll', ipHll);
app.use("/bruteForceBlockedIp", bruteForceBlockedIp);
app.use("/bloom", bloomFilterBlockedIp);

app.get("/health", (req, res) => {
    res.send("Server is up and running.");
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
