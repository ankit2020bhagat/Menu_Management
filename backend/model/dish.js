import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: String,
  category: {
    type: String,
    required: true,
  },
  rating: String,
});
const Dish = mongoose.model("Dish", dishSchema);
export default Dish;
