let router = require("express").Router();
let { registrationValidation, loginValidation } = require("../Middlewares/authValidation");
let { register, login } = require("../Controller/authController");

router.post("/register", registrationValidation, register);
router.post("/login", loginValidation, login);

module.exports = router;