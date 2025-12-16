let router = require("express").Router();

let { register, login } = require("../Controller/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;