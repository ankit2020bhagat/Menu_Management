import mongoose from "mongoose";
const mongoDBUrl = process.env.MONOG_URL || "mongodb://127.0.0.1:27017/menu";
const connectDB = async () => {
  try {
    mongoose.connect(mongoDBUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect to mongoDB");
  } catch (err) {
    console.log(err);
  }
};
export default connectDB;
