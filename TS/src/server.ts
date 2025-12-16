import express from "express";
import "dotenv/config";
import "./Config/Database.js";
import authRoutes from "./Routes/authRoutes.js";
import bookRoutes from "./Routes/bookRoutes.js";
import borrowRoutes from "./Routes/borrowRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Library Management System"));
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/borrow", borrowRoutes);


app.listen(port, () => console.log(`Listening on port ${port}`));
