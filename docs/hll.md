# Benchmarking Probabilistic Data Structures for Unique Count Estimation

## 1. Introduction
This project aims to compare the performance of brute-force methods and probabilistic data structures (specifically HyperLogLog) for estimating the number of unique IP addresses in large-scale datasets. The primary focus is on benchmarking parameters such as accuracy, speed, and scalability.

## 2. Methodology

### 2.1 Data Generation
We generate synthetic data to simulate real-world scenarios where a large number of IP addresses visit a system. The dataset consists of:
- Randomly generated IP addresses
- Timestamps indicating the time of visit

Initially, the IP addresses were generated uniformly at random, but for realism, we decided to introduce a **skewed distribution**, simulating real-world traffic patterns where some IPs appear more frequently than others.

#### Script for Data Generation
We created a script (`generate_data.js`) that:
- Generates a specified number of IP records.
- Uses a skewed probability distribution for generating repeated IPs.
- Saves the data in JSON format for further processing.

Command-line arguments:
- `--count`: Number of IP records to generate (default: 10,000).
- `--path`: Output file path (default: `data.json`).

#### **Skewed IP Distribution: Our Approach**  

Instead of using a mathematical Zipfian distribution, we manually **biased the probability** of generating certain IP ranges based on real-world patterns. This approach ensures that:
1. **Common private networks (home/office users, ISPs, cloud providers) are overrepresented.**  
2. **Public IPs still exist but in a lower proportion.**  
3. **The dataset mimics how real-world website visitors behave.**

---

#### **How Our Distribution Works**
We divided IPs into four categories based on their probability of occurrence:

| **IP Range**        | **Probability** | **Description** |
|---------------------|----------------|----------------|
| **192.168.x.x**    | **40%**         | Home and office networks (common for local users) |
| **10.x.x.x**       | **30%**         | Enterprise and ISP-assigned networks |
| **172.16.x.x – 172.31.x.x** | **15%** | VPNs, cloud providers, and corporate setups |
| **Random public IPs** | **15%** | Unique visitors, global access |

This manual skew **ensures that some IPs appear disproportionately more often than others**, creating **clustering effects** seen in real-world network traffic.

---

#### **Why This Matters for Benchmarking**
- **Brute Force Approach:** Since many IPs repeat, `COUNT(DISTINCT ip)` operations in PostgreSQL will need to process a high number of duplicate entries, increasing **memory usage and query time**.  
- **HyperLogLog (HLL):** This method approximates unique IP counts and is **less affected by duplicates**, so we expect it to handle this skewed distribution efficiently.  
- **Realism:** Many websites experience high repeat visits from a subset of users while others visit only once. Our method ensures the dataset is closer to actual internet traffic patterns.  

This way, our benchmarking will reflect the strengths and weaknesses of each approach in a **practical** scenario rather than an artificial, evenly-distributed dataset.

### 2.2 Storage and Processing

#### Brute Force Approach
- **Storage:** The raw IP data is stored in a PostgreSQL database.
- **Counting:** The system queries the database using `COUNT(DISTINCT ip)` to determine the number of unique visitors.
- **Limitations:** This method is slow and consumes a large amount of memory as dataset size increases.

#### HyperLogLog Approach
- **Storage:** Instead of storing raw IP data, we store IP hashes in a Redis HyperLogLog instance.
- **Counting:** The `PFCOUNT` command in Redis returns an approximate count of unique IPs.
- **Advantages:** Requires significantly less memory and is much faster compared to brute-force counting.

## 3. Implementation

### 3.1 Tech Stack
- **Backend:** Node.js with Express.js
- **Database:** PostgreSQL for brute-force counting
- **In-memory Store:** Redis for HyperLogLog-based counting
- **ORM:** Prisma for interacting with PostgreSQL

### 3.2 Directory Structure
```
benchmarking/
│── src/
│   ├── api/            # API routes for brute force and HLL methods
│   ├── controllers/    # Business logic for processing data
│   ├── services/       # Database and Redis interaction logic
│   ├── utils/          # Helper functions (e.g., random IP generation)
│   ├── config/         # Configuration files for DB and Redis
│   ├── scripts/        # Data generation, loading, and testing scripts
│   ├── routes/         # Express route definitions
│   ├── server.js       # Express app entry point
│── docs/               # Documentation files
│── package.json        # Dependencies and scripts
│── README.md           # Overview and setup instructions
```

### 3.3 Current Progress
- ✅ Set up Node.js + Express backend
- ✅ Implemented CLI-based script for generating synthetic IP data
- ✅ Decided on using a skewed IP distribution for realism
- 🚧 Next Steps: Implement scripts to load data into PostgreSQL and Redis

## 4. Next Steps
- Implement data loaders for PostgreSQL and Redis.
- Set up API endpoints to query brute-force and HyperLogLog-based counts.
- Design benchmarking tests to compare accuracy, speed, and scalability.
- Document findings for the research paper.

