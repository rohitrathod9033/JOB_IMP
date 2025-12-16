"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.URL || "");
        console.log("Database connected");
    }
    catch (error) {
        console.log(error.message);
    }
};
connectDB();
exports.default = connectDB;
//# sourceMappingURL=Database.js.map