let router = require("express").Router();
let { borrowBook, returnBook, userBorrows, allBorrows } = require("../Controller/borrowController");
let { authorizeRole } = require("../Middlewares/roleMiddleware");
let ensureToken = require("../Middlewares/tokenMiddleware");

// User
router.post("/borrow", ensureToken, authorizeRole("member"), borrowBook);
router.post("/return", ensureToken, authorizeRole("member"), returnBook);
router.get("/my-borrows", ensureToken, authorizeRole("member"), userBorrows);

// Admin
router.get("/all", ensureToken, authorizeRole("admin"), allBorrows);

module.exports = router;