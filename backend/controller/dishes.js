import Dish from "../model/dish.js";
import User from "../model/user.js";

export const addDish = async (req, res) => {
  try {
    const dish = new Dish({
      dishName: req.body.dishName,
      description: req.body.description,
      image: req.file.filename,
      price: req.body.price,
      category: req.body.category,
      rating: req.body.rating,
    });

    await dish.save();

    res.status(201).json({ message: "Dish uploaded successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error", err: err });
  }
};

export const getDish = async (req, res) => {
  try {
    const dish = await Dish.find();
    if (dish) {
      return res.status(200).json({ dish: dish });
    } else {
      return res.status(404).json({ message: "Failed to find" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err: err });
  }
};

export const getDishByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const dish = await Dish.find({ category });
    if (dish) {
      return res.status(200).json({ dish: dish });
    } else {
      return res.status(404).json({ Message: "Dish not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err: err });
  }
};

export const updateDish = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);

    if (dish) {
      dish.dishName = req.body.dishName || dish.dishName;
      dish.description = req.body.description | dish.description;
      dish.price = req.body.price || dish.price;
      dish.image = req.body.image_url || dish.image;
      dish.rating = req.body.rating || dish.rating;

      await dish.save();
      return res.status(200).json({ message: "Updated dish" });
    } else {
      return res.status(404).json({ message: "Failed to update dish" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error", err: err });
  }
};

export const deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.user.id);
    if (user.isAdmin) {
      if (dish) {
        return res
          .status(200)
          .json({ message: "Dish deleted succeffuly", dish: dish });
      } else {
        return res.status(404).json({ message: "Failed to delete dish" });
      }
    } else {
      return res.json({ message: "UnAuthorised" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error", err: err });
  }
};
