import express from "express";
import connectDB from "./config/db.js";
import dishRouter from "./route/dish.js";
import userRouter from "./route/user.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

// Create the multer instance

const PORT = process.env.PORT || 8000;
connectDB();
app.get("/menu_management", (req, res) => {
  res.json({ messsage: "We are live" });
});

app.use(express.json());
app.use("/menu_management", dishRouter);
app.use("/userRouter", userRouter);

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("listening on port " + PORT);
  }
});
