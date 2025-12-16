export interface userRequest {
  user?: {
    id: string;
    name?: string;
    email?: string;
    role: "admin" | "member";
  };
}

import { Schema } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "member";
  createAt?: Date;
  updateAt?: Date;
}

export interface IBook extends Document {
    title: string;
    author: string;
    category: string;
    publicationYear: number;
    totalCopies: number;
    availableCopies: number;
    status: string;
}

export interface IBorrow extends Document {
    userId: Schema.Types.ObjectId;
    bookId: Schema.Types.ObjectId;
    borrowDate: Date;
    returnDate?: Date;
    status: "borrowed" | "returned";
}