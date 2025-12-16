import mongoose, { Schema } from "mongoose";
import { IBorrow } from "../Types/type.js";

const bookBorrowSchema = new Schema<IBorrow>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },
  },
  { timestamps: true }
);

const Borrow = mongoose.model<IBorrow>("Borrow", bookBorrowSchema);

export default Borrow;
