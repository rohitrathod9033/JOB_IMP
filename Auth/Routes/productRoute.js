const ensuretoken = require("../Middlewares/auth");
let router = require("express").Router();

router.get("/", ensuretoken, (req, res) => {
    console.log(req.user);
  res.status(200).json([
    {
      name: "Mobile",
      price: 100,
    },
    {
      name: "Laptop",
      price: 200,
    },
    {
      name: "Tablet",
      price: 300,
    },
    {
      name: "Camera",
      price: 400,
    },
    {
      name: "Watch",
      price: 500,
    },
    {
      name: "Headphone",
      price: 600,
    },
    {
      name: "Keyboard",
      price: 700,
    },
    {
      name: "Mouse",
      price: 800,
    },
    {
      name: "Printer",
      price: 900,
    },
    {
      name: "Scanner",
      price: 1000,
    },
    {
      name: "Router",
      price: 1100,
    },
    {
      name: "Switch",
      price: 1200,
    },
    {
      name: "Modem",
      price: 1300,
    },
    {
      name: "Camera",
      price: 1400,
    },
  ]);
});

module.exports = router;
