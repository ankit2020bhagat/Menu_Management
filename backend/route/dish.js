import express from "express";
import upload from "../middleware/upload.js";

import {
  addDish,
  deleteDish,
  getDish,
  updateDish,
  getDishByCategory,
} from "../controller/dishes.js";
import auth from "../middleware/authorization.js";
const dishRouter = express.Router();
dishRouter.post("/addDish", auth, upload.single("image"), addDish);
dishRouter.get("/getDish", getDish);
dishRouter.get("/getdishbycategory/:category", getDishByCategory);
dishRouter.put("/updateDish/:id", upload.single("image"), updateDish);
dishRouter.delete("/deleteDish/:id", auth, deleteDish);
export default dishRouter;
