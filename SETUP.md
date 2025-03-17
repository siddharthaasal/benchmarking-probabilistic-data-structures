

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


node scripts/generateIpData.js --count 5000 --path ./data/data.json
node scripts/loadIpData.js 
node scripts/seedHll.js
node ./src/benchmarks/uniqueIp/api.js 