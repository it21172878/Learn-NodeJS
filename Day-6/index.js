const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

app.listen(3001, () => console.log('Server is running on port 3001'));

mongoose
  .connect(
    'mongodb+srv://Dilanka_Prasad:Dilanka0402@dilanka.tl5kwpt.mongodb.net/day6auth?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connecting to database...');
  })
  .catch((err) => {
    console.error(err);
  });

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model('users', userSchema);

app.use(express.json());

// user register
app.post('/register', (req, res) => {
  const user = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      bcrypt.hash(user.password, salt, (err, hashPassword) => {
        if (!err) {
          user.password = hashPassword;
          userModel
            .create(user)
            .then((doc) => {
              res.send({ message: 'User Created Successfully!', data: doc });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  });
});

// user login
app.post('/login', (req, res) => {
  const userCred = req.body;
  userModel.findOne({ email: userCred.email }).then((user) => {
    if (user !== null) {
      bcrypt.compare(userCred.password, user.password, (err, result) => {
        if (result === true) {
          jwt.sign({ email: userCred.email }, 'dilankaauth', (err, token) => {
            if (!err) {
              res.send({ token: token });
            } else {
              res.send({ message: 'Error creating token' });
            }
          });
        } else {
          res.send({ message: 'Incorrect Password' });
        }
      });
    } else {
      res.send({ message: 'Invalid Email' });
    }
  });
});

app.get('/getdata', verifyToken, (req, res) => {
  res.send({ message: 'I am bad developer with a good heart' });
});

function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'dilankaauth', (err, authData) => {
    if (!err) {
      console.log(authData);
      next();
    } else {
      res
        .status(401)
        .send({ message: 'Login session expired. Please login again' });
    }
  });
}
