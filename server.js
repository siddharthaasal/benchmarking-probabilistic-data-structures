import express from "express";
import bruteForceRoutes from "./src/api/bruteForce.js";
import ipHll from "./src/api/ipHll.js";

const app = express();

const port = 3000;

app.use(express.json());

app.use("/bruteForce", bruteForceRoutes);
app.use('/hll', ipHll);

app.get("/health", (req, res) => {
    res.send("Server is up and running.");
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
