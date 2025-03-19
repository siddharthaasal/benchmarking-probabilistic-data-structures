

## Running this project
Create a directory to store the IP Adresses
```
mkdir data
```
Generate IP Adresses, you can modify the count value
```
node scripts/generateIpData.js --count 5000 --path ./data/data.json
```


sudo -i -u postgres
psql

postgres=# CREATE DATABASE benchmarking;
CREATE DATABASE

\c

postgres=# CREATE TABLE ip_logs (
    id SERIAL PRIMARY KEY,
    ip VARCHAR(45) NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE

postgres=# 


node ./scripts/checkDb.js
node scripts/loadIpData.js 

http://localhost:3000/bruteForce/unique-ip-count
or
curl http://localhost:3000/bruteForce/unique-ip-count



ensure redis installed and running
PING
PONG


node scripts/seedHll.js

curl http://localhost:3000/hll/count


<!-- hyper log log -->
node scripts/generateIpData.js --count 5000 --path ./data/data.json
node scripts/loadIpData.js 
node scripts/seedHll.js
node ./src/benchmarks/uniqueIp/api.js 


<!-- bloom filter -->

CREATE TABLE blocked_ips (
    id SERIAL PRIMARY KEY,
    ip VARCHAR(45) NOT NULL UNIQUE,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

sudo systemctl stop redis
docker run -p 6379:6379 -it --rm redis/redis-stack-server:latest
node scripts/generateIpData.js --count 5000 --path ./data/blocked_ips.json
node scripts/loadBlockedIpData.js
node scripts/seedBf.js
curl http://localhost:3000/bruteForceBlockedIp/is-blocked/10.90.68.223
curl http://localhost:3000/bloom/is-blocked/10.90.68.222
node src/benchmarks/blockedIpBenchmark.js 