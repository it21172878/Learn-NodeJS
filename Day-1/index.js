const fs = require('fs');
const os = require('os');

// *file read to sync way
// fs.readFileSync('./doc.txt', 'utf-8');

// fs.appendFile('./doc.txt', '\nPrasad Liyanagama', (err) => {
//   console.log(err);
// });

// *file read to async way
// const file = fs.readFile('./doc.txt', 'utf-8', (err, data) => {
//   console.log(err);
//   console.log(data);
// });

// *create file
// let products = fs.writeFileSync('./products.txt', 'Apple');
// fs.readFile('./products.txt', 'utf-8', (err, data) => {
//   console.log(data);
// });

// *delete file
// fs.unlinkSync('./products.txt');

// *use os methods
console.log(os.arch()); // get cpu architecture
console.log(os.platform()); // get operating system platform
console.log(os.type()); // get the type of operating system
console.log(os.release()); // get the release version of the operating system
console.log(os.hostname());
console.log(os.uptime());
console.log(os.userInfo());
