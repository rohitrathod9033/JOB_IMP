import mongoose, { Schema } from "mongoose";
import { IBook } from "../Types/type.js";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    totalCopies: {
      type: Number,
      required: true,
    },
    availableCopies: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["available", "unavailable"],
      default: "available",
    },
  },
  { timestamps: true }
);

const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;
