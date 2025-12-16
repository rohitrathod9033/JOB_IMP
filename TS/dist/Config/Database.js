import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.URL || "";
if (!url) {
    console.log("MongoDB URL Not Found");
}
mongoose
    .connect(url)
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
//# sourceMappingURL=Database.js.map