const http = require('http');
const fs = require('fs');
const url = require('url');

http
  .createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);

    // parse the URL to get path and query-----------------------------------------------
    const pathURL = url.parse(req.url, true);
    console.log(pathURL);

    let getProducts = fs.readFileSync('./products.json', 'utf-8');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method == 'OPTIONS') {
      res.end();
    }

    // create API for get all products in file-------------------------------------------
    if (
      pathURL.pathname == '/products' &&
      req.method == 'GET' &&
      pathURL.query.id == undefined
    ) {
      res.end(getProducts);
    }
    // create API for search product by ID-----------------------------------------------
    else if (
      pathURL.pathname == '/products' &&
      req.method == 'GET' &&
      pathURL.query.id !== undefined
    ) {
      let convertToArray = JSON.parse(getProducts);
      let foundProduct = convertToArray.find((product) => {
        return product.id == pathURL.query.id;
      });
      if (foundProduct != undefined) {
        res.end(JSON.stringify(foundProduct));
      } else {
        res.end(JSON.stringify({ message: 'Product Not Found' }));
      }
    }

    //  create API for add new product - POST request------------------------------------
    else if (pathURL.pathname == '/products' && req.method == 'POST') {
      let newProduct = '';

      req.on('data', (chunk) => {
        newProduct += chunk;
      });
      req.on('end', () => {
        // console.log(newProduct);
        let convertToArray = JSON.parse(getProducts);
        let createdProduct = JSON.parse(newProduct);
        convertToArray.push(createdProduct);

        fs.writeFile(
          './products.json',
          JSON.stringify(convertToArray),
          (err) => {
            if (err == null) {
              res.end(
                JSON.stringify({ message: 'New Product Created Successfully!' })
              );
            } else {
              res.end(
                JSON.stringify({ message: 'Product Could Not Be Added' })
              );
            }
          }
        );
      });
    }
    // update existing product - PUT request-----------------------------------------
    else if (pathURL.pathname == '/products' && req.method == 'PUT') {
      let upProduct = '';
      req.on('data', (chunk) => {
        upProduct += chunk;
      });
      req.on('end', () => {
        let convertToArray = JSON.parse(getProducts);
        let updatedProduct = JSON.parse(upProduct);
        let index = convertToArray.findIndex((product) => {
          return product.id == pathURL.query.id;
        });
        if (index !== -1) {
          convertToArray[index] = updatedProduct;
          fs.writeFile(
            './products.json',
            JSON.stringify(convertToArray),
            (err) => {
              if (err == null) {
                res.end(
                  JSON.stringify({ message: 'Product Updated Successfully!' })
                );
              } else {
                res.end(
                  JSON.stringify({
                    message: 'Identified Some Error When Updating Product',
                  })
                );
              }
            }
          );
        } else {
          res.end(JSON.stringify({ message: 'Product Not Found' }));
        }
      });
    }
    // delete existing product by id - DELETE request--------------------------------
    else if (pathURL.pathname == '/products' && req.method == 'DELETE') {
      let convertToArray = JSON.parse(getProducts);
      let index = convertToArray.findIndex((product) => {
        return product.id == pathURL.query.id;
      });
      if (index !== -1) {
        convertToArray.splice(index, 1);
        fs.writeFile(
          './products.json',
          JSON.stringify(convertToArray),
          (err) => {
            if (err == null) {
              res.end(
                JSON.stringify({ message: 'Product Deleted Successfully!' })
              );
            } else {
              res.end(
                JSON.stringify({
                  message: 'Identified Some Error When Updating Product',
                })
              );
            }
          }
        );
      } else {
        res.end(JSON.stringify({ message: 'Product Not Found' }));
      }
    }
    // res.end('response');
  })
  .listen(8000);
