let express = require("express");
let app = express();
require("./Config/Database");
let port = process.env.PORT || 3000;
let authRoutes = require("./Routes/authRoutes");
let bookRoutes = require("./Routes/bookRoutes");
let borrowRoutes = require("./Routes/borrowRoutes");

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Library Management System"));
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/borrow", borrowRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));