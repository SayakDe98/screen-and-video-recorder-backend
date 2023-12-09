const mongoose = require("mongoose");
require("dotenv").config();


module.exports = () => {
  try {
    mongoose.connect(
      process.env.mongoURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to database");
  } catch (error) {
    console.log('Error connecting to db', error);
  }
}