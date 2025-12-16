let router = require("express").Router();
let { bookValidation } = require("../Middlewares/bookValidation");
let { addBook, getBook, updateBook, deleteBook } = require("../Controller/bookController");
let ensureToken = require("../Middlewares/tokenMiddleware");
let { authorizeRole } = require("../Middlewares/roleMiddleware");

router.post("/add", ensureToken, authorizeRole("admin"), bookValidation, addBook);
router.put("/update/:id", ensureToken, authorizeRole("admin"), bookValidation, updateBook);
router.delete("/delete/:id", ensureToken, authorizeRole("admin"), deleteBook);

router.get("/getData", ensureToken, authorizeRole("admin", "member"), getBook);

module.exports = router;