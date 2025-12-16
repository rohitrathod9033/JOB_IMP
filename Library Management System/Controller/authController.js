let User = require("../Model/User");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

let register = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    let hashPassword = await bcrypt.hash(password, 10);

    let newUser = new User({ name, email, password: hashPassword, role });
    await newUser.save();

    res.status(201).json({
      message: "Register Successfully || User Created Successfully",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "User Already Exist || Register Failed", success: false });
  }
};

let login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email }).lean();

    if (!user) {
      return res.status(403).json({ message: "User not found", success: false });
    }

    let isPass = await bcrypt.compare(password, user.password);
    if (!isPass) {
      return res.status(403).json({ message: "Password not match", success: false });
    }

    // Token Generate
    let jwtToken = jwt.sign(
      { id: user._id, role: user.role, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Login Successfully",
      success: true,
      jwtToken,
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { register, login };
