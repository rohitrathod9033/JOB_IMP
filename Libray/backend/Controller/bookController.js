import Book from "../Model/Book.js";

// add book
let addBook = async (req, res) => {
  try {
    // Book Already Added
    let book = await Book.findOne({ title: req.body.title }).lean();
    if (book) {
      return res.status(400).json({
        message: "Book already added",
        success: false,
      });
    }

    let newBook = new Book(req.body);
    await newBook.save();
    return res.status(201).json({
      message: "Book added successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong during adding book",
      success: false,
      error: error.message,
    });
  }
};

let getBook = async (req, res) => {
  try {
    let query = {};
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    if (req.user.role === "admin") {
      query = {};
    } else {
      return res.status(404).json({ message: "Role Not Found", success: false });
    }

    // Total count according to role
    const totalBooks = await Book.countDocuments(query);

    // Paginated books
    const books = await Book.find(query)
      .skip(skip)
      .limit(limit)
      .lean();

    return res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      currentPage: page,
      limit: limit,
      totalBooks: totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      data: books,

    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong during getting books",
      error: error.message,
    });
  }
};


// get book by Id
let getBookById = async (req, res) => {
  try {
    let id = req.params.id;

    const book = await Book.findById(id).lean();

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Book fetched successfully",
      success: true,
      data: book,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while fetching the book",
      success: false,
      error: error.message,
    });
  }
};

// update book
let updateBook = async (req, res) => {
  let { id } = req.params;

  if (!id) {
    res
      .status(400)
      .json({ message: "Please provide book id", success: false });
  }

  try {
    let updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedBook) {
      return res
        .status(200)
        .json({ message: "Book updated successfully", success: true });
    } else {
      return res
        .status(404)
        .json({ message: "Book not found", success: false });
    }
  } catch (error) { }
};

// delete book
let deleteBook = async (req, res) => {
  try {
    let { id } = req.params;

    if (!id) {
      res
        .status(400)
        .json({ message: "Please provide book id", success: false });
    }

    let dltBook = await Book.findByIdAndDelete(id);
    if (dltBook) {
      return res
        .status(200)
        .json({ message: "Book deleted successfully", success: true });
    } else {
      return res
        .status(404)
        .json({ message: "Book not found", success: false });
    }
  } catch (error) { }
};

let AvailableBooks = async (req, res) => {
  try {
    let query = {};
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    if (req.user.role == "member") {
      query = { status: "available" }
    } else {
      return res.status(404).json({ message: "Role Not Found", success: false });
    }

    const totalBooks = await Book.countDocuments(query);
    const books = await Book.find(query).skip(skip).limit(limit);

    return res.status(200).json({
      message: "Available Books fetched successfully",
      success: true,
      currentPage: page,
      limit: limit,
      totalBooks: totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
      data: books,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong during getting available books",
      success: false,
      error: error.message,
    });
  }
};

export { addBook, getBook, getBookById, updateBook, deleteBook, AvailableBooks };