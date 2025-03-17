import { program } from "commander";
import fs from "fs";

// function purelyRandomIp() {
//     var ip = "";
//     for (let i = 1; i <= 4; i++) {
//         ip += Math.floor(Math.random() * 256);
//         if (i != 4) {
//             ip += ".";
//         }
//     }
//     return ip;
// }

function randomIp() {
    //skewed distribultion
    const random = Math.random();

    if (random < 0.4) {
        // 40% probability → 192.168.x.x (Home/Office Networks)
        return `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    } else if (random < 0.7) {
        // 30% probability → 10.x.x.x (Enterprise Networks)
        return `10.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    } else if (random < 0.85) {
        // 15% probability → 172.16.x.x - 172.31.x.x (VPNs, Cloud Providers)
        return `172.${16 + Math.floor(Math.random() * 16)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    } else {
        // 15% probability → Fully random public IP
        return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    }

}

function generateData(length) {
    const data = [];
    for (var i = 1; i <= length; i++) {
        data.push({
            ip: randomIp(),
            timestamp: new Date().toISOString(),
        });
    }
    return data;
}


program
    .option('-c, --count <number>', 'count of ip addresses', '10000')
    .option('-p, --path <filename>', 'path of output file', 'data/data.json')

program.parse(process.argv);
const options = program.opts();

const dataLength = parseInt(options.count);
const data = generateData(dataLength);

fs.writeFileSync(options.path, JSON.stringify(data, null, 2));
console.log(`Generated ${options.count} records and saved to ${options.path}`);