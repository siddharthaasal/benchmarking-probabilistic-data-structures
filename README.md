
# **Benchmarking Probabilistic Data Structures**  
This project benchmarks **probabilistic data structures** like **HyperLogLog (HLL)** and **Bloom Filters** against **brute-force methods** for:  
1. **Unique IP Counting** in a video streaming platform  
2. **Blocked IP Detection** for cybersecurity (DDoS attack mitigation)  

## **Features**
- **Brute-force method (PostgreSQL)** → Exact results (but high memory usage)  
- **HyperLogLog (Redis)** → Approximate unique IP counting (low memory usage)  
- **Bloom Filter (Redis)** → Fast blocked IP detection (probabilistic false positives)  
- **Performance comparison** → Speed, accuracy, memory usage  

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

### **3️⃣ Start Redis Stack Server (for HLL & Bloom Filter)**
```sh
docker run -p 6379:6379 -it --rm redis/redis-stack-server:latest
```

### **4️⃣ Ensure PostgreSQL is Running**
```sh
# Start PostgreSQL
sudo service postgresql start

# Login to PostgreSQL
sudo -i -u postgres
psql
```

---

## **Benchmarking Unique IP Counting**

### **1️⃣ Generate IP Address Data**
```sh
mkdir data
node scripts/generateIpData.js --count 5000 --path ./data/data.json
```

### **2️⃣ Set Up PostgreSQL for Unique IP Counting**
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

### **3️⃣ Load IP Data into PostgreSQL**
```sh
node scripts/loadIpData.js
```

### **4️⃣ Seed HyperLogLog (HLL) in Redis**
```sh
node scripts/seedHll.js
```

### **5️⃣ Run Unique IP Count Benchmarks**
```sh
node src/benchmarks/uniqueIpBenchmark.js
```

**Test API Endpoints:**
```sh
# Brute-force unique IP count
curl http://localhost:3000/bruteForce/unique-ip-count

# HLL estimated unique IP count
curl http://localhost:3000/hll/count
```

---

## **Benchmarking Blocked IP Detection (Bloom Filter)**

### **1️⃣ Generate Blocked IP Data**
```sh
node scripts/generateIpData.js --count 5000 --path ./data/blocked_ips.json
```

### **2️⃣ Set Up PostgreSQL for Blocked IP Detection**
#### **Create Database & Table**
```sql
CREATE DATABASE benchmarking;
\c benchmarking;

CREATE TABLE blocked_ips (
    id SERIAL PRIMARY KEY,
    ip VARCHAR(45) UNIQUE NOT NULL
);
```

### **3️⃣ Load Blocked IP Data into PostgreSQL**
```sh
node scripts/loadBlockedIpData.js
```

### **4️⃣ Seed Bloom Filter with Blocked IPs**
```sh
node scripts/seedBf.js
```

### **5️⃣ Run Blocked IP Detection Benchmarks**
```sh
node src/benchmarks/blockedIpBenchmark.js
```

**Test API Endpoints:**
```sh
# Brute-force blocked IP check
curl http://localhost:3000/bruteForceBlockedIp/is-blocked/10.90.68.223

# Bloom Filter blocked IP check
curl http://localhost:3000/bloom/is-blocked/10.90.68.222
```

---

## **Performance Metrics**
The benchmarking results include:
- **Response time comparison** (Brute-force vs. Probabilistic methods)
- **Throughput (requests/sec)**
- **Memory usage (PostgreSQL vs. Redis)**
- **Accuracy (false positives & false negatives in Bloom Filter)**

---

## **License**
MIT License  

