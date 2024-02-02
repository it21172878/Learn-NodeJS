const http = require('http');
const fs = require('fs');
const url = require('url');

// create a server
// create API
http
  .createServer((req, res) => {
    // console.log(url.parse(req.url, true));
    const pathURL = url.parse(req.url, true);
    console.log(pathURL);

    let products = fs.readFileSync('./products.json', 'utf-8');

    // get all products
    if (
      pathURL.pathname == '/products' &&
      req.method == 'GET' &&
      pathURL.query.id == undefined
    ) {
      res.end(products);
    }
    // get specific data base on id
    else if (
      pathURL.pathname == '/products' &&
      req.method == 'GET' &&
      pathURL.query.id !== undefined
    ) {
      let convertToArray = JSON.parse(products); //  convert string to object by "JSON.parse()"
      let product = convertToArray.find((product) => {
        return product.id == pathURL.query.id;
      });
      if (product != undefined) {
        res.end(JSON.stringify(product)); //  convert back to string with "JSON.stringify()"
      } else {
        res.end(JSON.stringify({ message: 'Product Not Found' }));
      }
    }
    // create a ne product and add to exist JSON file
    else if (pathURL.pathname == '/products' && req.method === 'POST') {
      let productData = '';
      //  collecting the data from client side
      // this event is called to every chunk
      req.on('data', (chunk) => {
        productData = productData + chunk;
      });
      // this event is called at the end of stream and converts byte data into readable strings
      req.on('end', () => {
        console.log(productData);
        let toArray = JSON.parse(products);
        let toObj = JSON.parse(productData);

        toArray.push(toObj);
        fs.writeFile('./products.json', JSON.stringify(toArray), (err) => {
          if (err == null) {
            res.end(
              JSON.stringify({ message: 'New Product Created Successfully!' })
            );
          }
        });
      });
    }
  })
  .listen(8080);
