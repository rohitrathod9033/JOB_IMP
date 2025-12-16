import Borrow from "../Model/BorrowRecord.js";
import Book from "../Model/Book.js";
import User from "../Model/User.js";
import { Request, Response, NextFunction } from "express";
import { userRequest } from "Types/type.js";

const borrowBook = async (req: Request & userRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    console.log("userId", userId);
    const { bookId } = req.body;
    console.log("bookId", bookId);

    const user = await User.findById(userId).lean();
    const book = await Book.findById(bookId).lean();

    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found", success: false });
    }

    if (book.availableCopies < 1) {
      return res
        .status(400)
        .json({ message: "Book copies not available", success: false });
    }

    const alreadyBorrowed = await Borrow.findOne({ userId, bookId, status: "borrowed" }).lean();

    if(alreadyBorrowed) {
      return res
        .status(400)
        .json({ message: "Book already borrowed", success: false });
    } 

    const borrowDate = Date.now();
    const returnDate = null;
    const status = "borrowed";

    const borrowRecord = await Borrow.create({ userId, bookId, borrowDate, returnDate, status, });

    if (borrowRecord) {
      await Book.findByIdAndUpdate(bookId, { $inc: { availableCopies: -1 } });
      return res.status(200).json({
        message: "Book borrowed successfully",
        success: true,
        borrow: {
          id: borrowRecord._id,
          status: borrowRecord.status,
          borrowDate: borrowRecord.borrowDate,
          user: {
            id: userId,
            name: user?.name,
            email: user?.email,
          },
          book: {
            id: bookId,
            title: book.title,
            author: book.author,
            category: book.category,
          },
        },
      });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({
        message: "Something went wrong in borrowing book",
        success: false,
        error: error.message,
      });
  }
};

const returnBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { borrowId } = req.body;

    const borrowRecord = await Borrow.findById(borrowId).lean();
    if (!borrowRecord) {
      return res
        .status(404)
        .json({ message: "Borrow record not found", success: false });
    }

    if(borrowRecord.status == "returned") {
      return res
        .status(400)
        .json({ message: "Book already returned", success: false });
    }

    if (borrowRecord.status == "borrowed") {
      const returnDate = Date.now();
      const status = "returned";

      const updateBorrowRecord = await Borrow.findByIdAndUpdate(
        borrowId,
        { returnDate, status },
        { new: true }
      );

      if (updateBorrowRecord) {
        await Book.findByIdAndUpdate(borrowRecord.bookId, {
          $inc: { availableCopies: 1 },
        });
        return res
          .status(200)
          .json({
            message: "Book returned successfully",
            success: true,
            borrow: updateBorrowRecord,
          });
      }
    }
  } catch (error: any) {
    res
      .status(500)
      .json({
        message: "Something went wrong in returning book",
        success: false,
        error: error.message,
      });
  }
};

const userBorrows = async (req: Request & userRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const userBorrows = await Borrow.find({ userId })
      .populate("userId", "name email")
      .populate("bookId", "title author category").lean();

    return res
      .status(200)
      .json({
        message: "User borrows fetched successfully",
        success: true,
        data: userBorrows,
      });
  } catch (error: any) {
    res
      .status(500)
      .json({
        message: "Something went wrong in getting user borrows",
        success: false,
        error: error.message,
      });
  }
};

const allBorrows = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allData = await Borrow.find()
      .populate("userId", "name email")
      .populate("bookId", "title author category").lean();

    return res
      .status(200)
      .json({
        message: "All borrows fetched successfully",
        success: true,
        data: allData,
      });
  } catch (error: any) {
    res
      .status(500)
      .json({
        message: "Something went wrong in getting all borrows",
        success: false,
        error: error.message,
      });
  }
};

export { borrowBook, returnBook, userBorrows, allBorrows };