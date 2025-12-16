import Book from "../Model/Book.js";
import { Request, Response } from "express";
import { userRequest } from "Types/type.js";

//add book
const addBook = async (req: Request & userRequest, res: Response): Promise<Response> => {
  try {
    const existsBook = await Book.findOne({ title: req.body.title });
    if (existsBook) {
      return res
        .status(400)
        .json({ message: "Book already added", success: false });
    }

    const newBook = new Book(req.body);
    await newBook.save();
    return res.status(201).json({
      message: "Book added successfully",
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Something went wrong during adding book",
      success: false,
      error: error.message,
    });
  }
};

// get book
const getBook = async (req: Request & userRequest, res: Response): Promise<Response> => {
  try {
    let books;
    if (req.user?.role == "admin") {
      books = await Book.find().lean();
    } else if (req.user?.role == "member") {
      books = await Book.find({ status: "available" }).lean();
    } else {
      return res
        .status(404)
        .json({ message: "Role Not Found", success: false });
    }

    return res.status(200).json({
      message: "Books fetched successfully",
      success: true,
      data: books,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Something went wrong during getting books",
      success: false,
      error: error.message,
    });
  }
};

// update book
const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "Please provide book id", success: false });
  }

  try {
    // let { title, author, category, publicationYear, totalCopies, availableCopies, status } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedBook) {
      return res
        .status(200)
        .json({ message: "Book updated successfully", success: true });
    } else {
      return res
        .status(404)
        .json({ message: "Book not found", success: false });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};

// delete book
const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res
        .status(400)
        .json({ message: "Please provide book id", success: false });
    }

    const dltBook = await Book.findByIdAndDelete(id);
    if (dltBook) {
      return res
        .status(200)
        .json({ message: "Book deleted successfully", success: true });
    } else {
      return res
        .status(404)
        .json({ message: "Book not found", success: false });
    }
  } catch (error) {}
};

export { addBook, getBook, updateBook, deleteBook };
