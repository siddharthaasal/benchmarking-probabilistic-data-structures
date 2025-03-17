
# **Benchmarking Probabilistic Data Structures**  
This project benchmarks **probabilistic data structures** like **HyperLogLog (HLL)** against **brute-force counting** for estimating unique IP addresses in a video streaming platform.  

## **Features**
- **Brute-force method (PostgreSQL)** → Exact counting  
- **HyperLogLog (Redis)** → Approximate counting with low memory usage  
- **Performance comparison** → Speed, accuracy, and memory usage  

---

## **Setup Guide**  

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/siddharthaasal/benchmarking-probabilistic-data-structures.git
cd benchmarking-probabilistic-data-structures
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Ensure Redis & PostgreSQL are Running**
```sh
# Start Redis
redis-server  

# Verify Redis is working
redis-cli PING  
# Expected Output: PONG  
```

---

## **Running This Project**

### **1️⃣ Create a Directory for IP Data**
```sh
mkdir data
```

### **2️⃣ Generate IP Addresses**
You can modify the `--count` value to generate more IPs.  
```sh
node scripts/generateIpData.js --count 5000 --path ./data/data.json
```

---

### **3️⃣ Set Up PostgreSQL**
#### **Login to PostgreSQL**
```sh
sudo -i -u postgres
psql
```

#### **Create Database & Table**
```sql
CREATE DATABASE benchmarking;
\c benchmarking;

CREATE TABLE ip_logs (
    id SERIAL PRIMARY KEY,
    ip VARCHAR(45) NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

---

### **4️⃣ Verify Database Connection**
```sh
node ./scripts/checkDb.js
```

### **5️⃣ Load Data into PostgreSQL**
```sh
node scripts/loadIpData.js
```

**Test API for Brute-force Unique IP Count:**  
```sh
curl http://localhost:3000/bruteForce/unique-ip-count
```

---

### **6️⃣ Load Data into HyperLogLog (HLL)**
```sh
node scripts/seedHll.js
```

**Test API for HLL Unique IP Count:**  
```sh
curl http://localhost:3000/hll/count
```

---

## **Run Benchmarks**
```sh
node ./src/benchmarks/uniqueIp/api.js
```

---

## **Notes**
- **PostgreSQL is used for brute-force exact counting.**
- **Redis HLL is used for memory-efficient approximate counting.**
- **The benchmark measures time, accuracy, and memory usage.**  

---

## **License**
MIT License  

