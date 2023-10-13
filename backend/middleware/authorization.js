import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.body.token || req.headers.authorization;

    const data = jwt.verify(token, process.env.SECRET_KEY);
    if (data) {
      req.user = data;
      next();
    }
  } catch (err) {
    return res.status(500).json({ message: "Invalid token", error: err });
  }
};
export default auth;
