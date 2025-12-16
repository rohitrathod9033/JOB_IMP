import express from "express";
const router = express.Router();
import bookValidation from "Middlewares/bookValidation.js";
import { addBook, getBook, updateBook, deleteBook } from "Controller/bookController.js";
import ensureToken from "Middlewares/tokenMiddleware.js";
import authorizeRole from "Middlewares/roleMiddleware.js";
router.post("/add", ensureToken, authorizeRole("admin"), bookValidation, addBook);
router.put("/update/:id", ensureToken, authorizeRole("admin"), bookValidation, updateBook);
router.delete("/delete/:id", ensureToken, authorizeRole("admin"), deleteBook);
router.get("/getData", ensureToken, authorizeRole("admin", "member"), getBook);
export default router;
//# sourceMappingURL=bookRoutes.js.map