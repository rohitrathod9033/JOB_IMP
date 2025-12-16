let router = require("express").Router();

let { registration, login} = require("../Controller/authController");
let { registrationValidation, loginValidation } = require("../Middlewares/authValidation");

router.post("/registration", registrationValidation, registration);
router.post("/login",loginValidation, login);

module.exports = router;