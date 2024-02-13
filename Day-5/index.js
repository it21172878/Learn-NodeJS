const express = require('express');
const mongoose = require('mongoose');

const app = express();
// create midleware
app.use(express.json());
// ----------------------------------------------------------------
// express.json((req, res, next) => {
//   let product = '';
//   req.on('data', (chunk) => {
//     product += chunk;
//   });
//   req.on('end', () => {
//     req.body = JSON.parse(product);
//     console.log(req.body);
//     next();
//   });
// });
// ----------------------------------------------------------------

// create MongoDB Connection
mongoose
  .connect(
    'mongodb+srv://Dilanka_Prasad:Dilanka0402@dilanka.tl5kwpt.mongodb.net/day4test?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('MongoDB Connected Successfully!');
  })
  .catch((err) => {
    console.log(err);
  });

// create product schema
const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price must be a number and required'],
      min: 1,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    category: {
      type: String,
      enum: ['Electronics', 'Clothing', 'Home Decor'],
    },
  },
  { timestamps: true }
);

// create model
const productsModel = mongoose.model('products', productsSchema);

app.listen(8080, () => {
  console.log('Server is running at http://localhost:8080');
});

//  get all products---------------------------------------------------
app.get('/products', (req, res) => {
  productsModel
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: 'We Can Not Found Any Products' });
    });
});

//  get one product -----------------------------------------------
app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  productsModel
    .findOne({ _id: id })
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: 'Product Not Found' });
    });
});

// app.get('/products/:id', (req, res) => {
//   res.send({ message: 'Product is found' });
// });

// create a product---------------------------------------------
app.post('/create', (req, res) => {
  const product = req.body;
  productsModel
    .create(product)
    .then((document) => {
      res.send({
        data: document,
        message: 'New Product Created Successfully!',
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: 'Occured Some Problem When Creating Product' });
    });
});

// delete a product--------------------------------------------------
app.delete('/products/:id', (req, res) => {
  const id = req.params.id;
  productsModel
    .deleteOne({ _id: id })
    .then((product) => {
      res.send({ message: 'Product Success Deleted' });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: 'We Can Not Found That Product' });
    });
});

// update a product----------------------------------------------------------
app.put('/products/:id', (req, res) => {
  const product = req.body;
  const id = req.params.id;
  productsModel
    .updateOne({ _id: id }, product)
    .then((document) => {
      res.send({ data: document, message: 'The Product Has Been Updated' });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: 'Occured Some Problem When Updateing Product' });
    });
});

// function midleware(req, res, next) {
//   if (req.params.id < 10) {
//     res.send({ message: 'You are blocked' });
//   } else {
//     next();
//   }
// }
