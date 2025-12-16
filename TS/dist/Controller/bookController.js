import Book from "../Model/Book.js";
//add book
let addBook = async (req, res) => {
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
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong during adding book",
            success: false,
            error: error.message,
        });
    }
};
// get book
const getBook = async (req, res) => {
    try {
        let books;
        if (req.user?.role == "admin") {
            books = await Book.find().lean();
        }
        else if (req.user?.role == "member") {
            books = await Book.find({ status: "available" }).lean();
        }
        else {
            return res
                .status(404)
                .json({ message: "Role Not Found", success: false });
        }
        return res.status(200).json({
            message: "Books fetched successfully",
            success: true,
            data: books,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went wrong during getting books",
            success: false,
            error: error.message,
        });
    }
};
// update book
let updateBook = async (req, res) => {
    let { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "Please provide book id", success: false });
    }
    try {
        // let { title, author, category, publicationYear, totalCopies, availableCopies, status } = req.body;
        let updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedBook) {
            return res
                .status(200)
                .json({ message: "Book updated successfully", success: true });
        }
        else {
            return res
                .status(404)
                .json({ message: "Book not found", success: false });
        }
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Something went wrong", success: false });
    }
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
        }
        else {
            return res
                .status(404)
                .json({ message: "Book not found", success: false });
        }
    }
    catch (error) { }
};
export { addBook, getBook, updateBook, deleteBook };
//# sourceMappingURL=bookController.js.map