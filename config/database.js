const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn =await mongoose.connect(
      "mongodb+srv://deepnet:A6sELenF8s9J9xWf@deepnet.yzsto.mongodb.net/MernCRUD?retryWrites=true&w=majority"
    );
    console.log(`database is connected to ${conn.connection.host}`);
  } catch (error) {
    console.log("the error is ", error);
    process.exit(1);
  }
};
module.exports = connectDB