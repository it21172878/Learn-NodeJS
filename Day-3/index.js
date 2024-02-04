const http = require('http');
const fs = require('fs');
const url = require('url');

// create a server
// create API
http
  .createServer((req, res) => {
    console.log(req.method);
    // console.log(url.parse(req.url, true));
    const pathURL = url.parse(req.url, true);
    console.log(pathURL);

    let products = fs.readFileSync('./products.json', 'utf-8');
    // set header for access any API from frontend to server

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method == 'OPTIONS') {
      res.end();
    }
    // get all products
    else if (
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
    // delete product in products.json
    else if (pathURL.pathname == '/products' && req.method == 'DELETE') {
      let cnvrtArray = JSON.parse(products);
      let index = cnvrtArray.findIndex((product) => {
        return product.id == pathURL.query.id;
      });
      if (index !== -1) {
        cnvrtArray.splice(index, 1);
        fs.writeFile('./products.json', JSON.stringify(cnvrtArray), (err) => {
          if (err == null) {
            res.end(JSON.stringify({ message: 'Deleted Successfully!' }));
          } else {
            res.end(JSON.stringify({ message: 'Something went wrong' }));
          }
        });
      } else {
        res.end(JSON.stringify({ message: 'not found a product' }));
      }
    }

    //  update a specific product
    else if (pathURL.pathname == '/products' && req.method == 'PUT') {
      let upProduct = '';

      req.on('data', (chunk) => {
        upProduct += chunk;
      });
      req.on('end', () => {
        let newUpArray = JSON.parse(products);
        let objUpdProd = JSON.parse(upProduct);

        let index = newUpArray.findIndex((product) => {
          return product.id == pathURL.query.id;
        });
        if (index !== -1) {
          newUpArray[index] = objUpdProd;
          fs.writeFile('./products.json', JSON.stringify(newUpArray), (err) => {
            if (err == null) {
              res.end(JSON.stringify({ message: 'Updated Successfully' }));
            } else {
              res.end(JSON.stringify({ message: 'Something went wrong' }));
            }
          });
        } else {
          res.end(JSON.stringify({ message: 'not found a product' }));
        }
      });
    }
  })
  .listen(8080);
