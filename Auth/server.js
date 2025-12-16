let express = require('express');
let app = express();
let cors = require('cors');
let authRoute = require('./Routes/authRoute');
let productRoute = require('./Routes/productRoute');
require('dotenv').config({ override: true });
require('./Models/Database');
let port = process.env.PORT || 3000;

const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Authentication"));
app.use("/auth", authRoute); 
app.use("/products", productRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});