let Borrow = require("../Model/BorrowRecord");
let Book = require("../Model/Book");
let User = require("../Model/User");

let borrowBook = async (req, res, next) => {
  try {
    let userId = req.user.id;
    let { bookId } = req.body;

    let user = await User.findById(req.user.id).lean();
    let book = await Book.findById(bookId).lean();

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

    let alreadyBorrowed = await Borrow.findOne({ userId, bookId, status: "borrowed" }).lean();

    if(alreadyBorrowed) {
      return res
        .status(400)
        .json({ message: "Book already borrowed", success: false });
    } 

    let borrowDate = Date.now();
    let returnDate = null;
    let status = "borrowed";

    let borrowRecord = await Borrow.create({ userId, bookId, borrowDate, returnDate, status, });

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
            name: user.name,
            email: user.email,
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
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Something went wrong in borrowing book",
        success: false,
        error: error.message,
      });
  }
};

let returnBook = async (req, res, next) => {
  try {
    let { borrowId } = req.body;

    let borrowRecord = await Borrow.findById(borrowId).lean();
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
      let returnDate = Date.now();
      let status = "returned";

      let updateBorrowRecord = await Borrow.findByIdAndUpdate(
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
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Something went wrong in returning book",
        success: false,
        error: error.message,
      });
  }
};

let userBorrows = async (req, res, next) => {
  try {
    let userId = req.user.id;
    let userBorrows = await Borrow.find({ userId })
      .populate("userId", "name email")
      .populate("bookId", "title author category").lean();

    return res
      .status(200)
      .json({
        message: "User borrows fetched successfully",
        success: true,
        data: userBorrows,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Something went wrong in getting user borrows",
        success: false,
        error: error.message,
      });
  }
};

let allBorrows = async (req, res, next) => {
  try {
    let allData = await Borrow.find()
      .populate("userId", "name email")
      .populate("bookId", "title author category").lean();

    return res
      .status(200)
      .json({
        message: "All borrows fetched successfully",
        success: true,
        data: allData,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Something went wrong in getting all borrows",
        success: false,
        error: error.message,
      });
  }
};

module.exports = { borrowBook, returnBook, userBorrows, allBorrows };