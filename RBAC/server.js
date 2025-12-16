let express = require('express');
let app = express();
let authRoute = require('./Routes/authRoute');
let userRoute = require('./Routes/userRoute');
require('./Models/Database');
let port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Role Base Authentication');
})
app.use("/auth", authRoute);
app.use("/user", userRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});