
### **Methodology**

#### 1. **Overview of the Benchmarking Study**
   - Briefly introduce the purpose of the study: to compare PDS against traditional brute-force methods for high-speed IP request analysis.
   - Mention the key metrics being evaluated: memory consumption, execution time, throughput, and accuracy.
   - State that synthetic data was used to ensure controlled and reproducible experiments.

#### 2. **Synthetic Data Generation**
   - **Rationale for Using Synthetic Data**:
     - Explain why synthetic data was chosen (e.g., lack of publicly available large-scale IP datasets, need for controlled experiments, reproducibility).
   - **Data Generation Process**:
     - Describe the algorithm used to generate synthetic IP addresses (e.g., skewed distribution to mimic real-world IP usage patterns).
     - Provide details on the distribution:
       - 40% of IPs in the `192.168.x.x` range (home/office networks).
       - 30% of IPs in the `10.x.x.x` range (enterprise networks).
       - 15% of IPs in the `172.16.x.x - 172.31.x.x` range (VPNs, cloud providers).
       - 15% of IPs as fully random public IPs.
     - Mention the use of timestamps to simulate IP request patterns over time.

     <!-- also explain with maths and probability why we did not choose purely random data
     x.x.x.x
      -->
   - **Validation of Synthetic Data**:
     - Explain how the synthetic data was validated to ensure it reflects real-world IP request patterns (e.g., statistical analysis, comparison with real-world datasets if available).

#### 3. **Experimental Setup**
   - **Hardware and Software Environment**:
     - Describe the hardware (e.g., CPU, RAM, storage) and software (e.g., operating system, programming language, libraries) used for the experiments.
   - **Probabilistic Data Structures (PDS)**:
     - List the PDS being evaluated (e.g., Bloom filters, Count-Min Sketch, HyperLogLog).
     - Briefly describe how each PDS works and its theoretical advantages for IP request analysis.
   - **Traditional Brute-Force Methods**:
     - Describe the brute-force methods used as a baseline (e.g., hash tables, linear search).
   - **Dataset Sizes**:
     - Specify the sizes of the synthetic datasets used in the experiments (e.g., 10,000, 100,000, 1,000,000 IPs).

#### 4. **Benchmarking Process**
   - **Metrics**:
     - Define the metrics being measured:
       - **Memory Consumption**: Memory usage of each method.
       - **Execution Time**: Time taken to process IP requests.
       - **Throughput**: Number of IP requests processed per unit time.
       - **Accuracy**: Error rates (e.g., false positives for Bloom filters).
   - **Experiments**:
     - Describe the experiments conducted for each metric:
       - **Memory Consumption**: Measure memory usage for different dataset sizes.
       - **Execution Time**: Measure processing time for a fixed number of IP requests.
       - **Throughput**: Measure the number of IP requests processed per second.
       - **Accuracy**: Compare the results of PDS against brute-force methods to calculate error rates.
   - **Repetition and Averaging**:
     - Mention that each experiment was repeated multiple times to ensure reliability, and results were averaged.

#### 5. **Data Analysis**
   - **Statistical Analysis**:
     - Describe how the results were analyzed (e.g., mean, standard deviation, confidence intervals).
   - **Visualization**:
     - Mention the use of graphs or charts to compare the performance of PDS and brute-force methods.

#### 6. **Limitations**
   - **Synthetic Data Limitations**:
     - Acknowledge that synthetic data may not fully capture the complexity of real-world IP request patterns.
   - **Generalizability**:
     - Discuss how the results might differ when applied to real-world datasets.

---

### **Example Methodology Section**

#### **1. Overview of the Benchmarking Study**
This study aims to evaluate the performance of Probabilistic Data Structures (PDS) for high-speed IP request analysis, comparing them against traditional brute-force methods. The key metrics under evaluation include memory consumption, execution time, throughput, and accuracy. Synthetic data was used to ensure controlled and reproducible experiments.

#### **2. Synthetic Data Generation**
Synthetic IP addresses were generated using a skewed distribution to mimic real-world IP usage patterns. The distribution was as follows:
- 40% of IPs in the `192.168.x.x` range (home/office networks).
- 30% of IPs in the `10.x.x.x` range (enterprise networks).
- 15% of IPs in the `172.16.x.x - 172.31.x.x` range (VPNs, cloud providers).
- 15% of IPs as fully random public IPs.

Timestamps were added to simulate IP request patterns over time. The synthetic data was validated by comparing its statistical properties (e.g., mean, variance, correlation) to real-world datasets.

#### **3. Experimental Setup**
The experiments were conducted on a machine with an Intel Core i7 processor, 16GB RAM, and a 512GB SSD, running Ubuntu 20.04. The PDS evaluated included Bloom filters, Count-Min Sketch, and HyperLogLog, while the brute-force baseline used hash tables. Synthetic datasets of sizes 10,000, 100,000, and 1,000,000 IPs were used.

#### **4. Benchmarking Process**
The following metrics were measured:
- **Memory Consumption**: Memory usage was recorded for each method using the `psutil` library.
- **Execution Time**: Processing time was measured using high-resolution timers.
- **Throughput**: The number of IP requests processed per second was calculated.
- **Accuracy**: Error rates (e.g., false positives for Bloom filters) were computed by comparing PDS results to brute-force results.

Each experiment was repeated 10 times, and results were averaged to ensure reliability.

#### **5. Data Analysis**
Results were analyzed using statistical methods (e.g., mean, standard deviation) and visualized using bar charts and line graphs to compare the performance of PDS and brute-force methods.

#### **6. Limitations**
While synthetic data allows for controlled experiments, it may not fully capture the complexity of real-world IP request patterns. Future work will involve validating the results on real-world datasets.

---

March 27, get this done.
