let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "manager", "user"],
    },
  },
  { timestamps: true }
);

let User = mongoose.model("User", userSchema);

module.exports = User;
