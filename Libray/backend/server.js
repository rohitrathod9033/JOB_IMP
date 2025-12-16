import express from "express";
import multer from "multer";
import cors from "cors";
const app = express();
// config
import "./Config/Database.js";
const port = process.env.PORT || 3000;
// Routes
import authRoutes from "./Routes/authRoutes.js";
import bookRoutes from "./Routes/bookRoutes.js";
import borrowRoutes from "./Routes/borrowRoutes.js";

// Upload

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));    // to saw image in frontend
app.use(
  cors({
    origin: "http://localhost:5173", // frontend url
    credentials: true,
  })
);

// Routes
app.get("/api/", (req, res) => res.send("Library Management System"));
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.post("/api/ImageThumbnail", upload.single("file"), (req, res) => res.send(req.file));

app.listen(port, () => console.log(`Listening on port ${port}`));