let router = require("express").Router();
let ensureToken = require("../Middlewares/authMiddleware");
let authorizeRole = require("../Middlewares/roleMiddleware");

router.get("/admin", ensureToken, authorizeRole("admin"), (req, res) => {
    res.status(200).json("User admin");
});

router.get("/manager", ensureToken, authorizeRole("manager", "admin"), (req, res) => {
    res.status(200).json("User manager");
});

router.get("/user", ensureToken, authorizeRole("user", "manager", "admin"), (req, res) => {
    res.status(200).json("User user");
});

module.exports = router;