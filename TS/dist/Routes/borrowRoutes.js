import express from "express";
const router = express.Router();
import { borrowBook, returnBook, userBorrows, allBorrows } from "Controller/borrowController.js";
import authorizeRole from "Middlewares/roleMiddleware.js";
import ensureToken from "Middlewares/tokenMiddleware.js";
// User
router.post("/borrow", ensureToken, authorizeRole("member"), borrowBook);
router.post("/return", ensureToken, authorizeRole("member"), returnBook);
router.get("/my-borrows", ensureToken, authorizeRole("member"), userBorrows);
// Admin
router.get("/all", ensureToken, authorizeRole("admin"), allBorrows);
export default router;
//# sourceMappingURL=borrowRoutes.js.map