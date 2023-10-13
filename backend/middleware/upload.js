import multer from "multer";

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".png");
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

export default upload;
