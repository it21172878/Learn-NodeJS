const mongoose = require('mongoose');

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

//   create a schema for the user model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
    },
    role: {
      type: String,
      required: [true, 'Please provide your role'],
      enum: ['admin', 'user', 'manager'], // only allow "admin" , "user" or "manager"
    },
    age: {
      type: Number,
      required: [true, 'please provide your age'],
      min: [18, 'You must be at least 18 years old'],
      max: [120, "You can't be older than 120"],
    },
  },
  { timestamps: true }
);

// creare a model for scheama
const userModel = mongoose.model('users', userSchema);

// add data to database-------------------------------------------------------------------------
// let user = {
//   name: 'Dilanka Prasad',
//   password: 'password123456789',
//   role: 'user',
//   age: 25,
// };

// userModel
//   .create(user)
//   .then((data) => {
//     console.log(data);
//     console.log('New User Created Successfully!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// fetch all data from database-------------------------------------------------------------------------
// userModel
//   .find()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//  find specific all datas by find() ----------------------------------------------------------------------
// userModel
//   .find({ name: 'Dilanka Prasad' })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// find specific one data by findOne()------------------get first result only------------------------------------------
// userModel
//   .findOne({ name: 'Dilanka Prasad' })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// find and sort all data with assendding order------------------------------------------
// userModel
//   .find()
//   .sort({ age: 1 })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// find and sort all data with dessending order------------------------------------------
// userModel
//   .find()
//   .sort({ age: -1 })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// update one---------------------------------------------------------------------------
userModel
  .updateOne({ name: 'Dilanka Prasad' }, { age: 15 })
  .then((info) => {
    console.log(info);
  })
  .catch((err) => {
    console.log(err);
  });
// userModel
//   .updateMany({ name: 'Dilanka Prasad' }, { age: 25 })
//   .then((info) => {
//     console.log(info);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// delete one-----------------------------------------------------------------------------
// userModel
//   .deleteOne({ name: 'Dilanka Prasad' })
//   .then((info) => {
//     console.log(info);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// userModel
//   .deleteMany({ name: 'Dilanka Prasad' })
//   .then((info) => {
//     console.log(info);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
