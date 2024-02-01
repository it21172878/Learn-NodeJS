const http = require('http');

// create a server
// create API
http
  .createServer((req, res) => {
    // console.log(req.url);
    // console.log(req.method);
    // res.end('I am the response');
    if (req.url === '/create' && req.method === 'POST') {
      res.end('User Created Successfully');
    } else if (req.url === '/product/create' && req.method === 'POST') {
      res.end('Product Created Successfully');
    } else if (req.url === '/products' && req.method === 'GET') {
      res.end('Get All Products Details');
    }
  })
  .listen(8080);
