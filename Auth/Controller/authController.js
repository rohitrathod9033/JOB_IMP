let jwt = require("jsonwebtoken");
let User = require("../Models/User");
let bcrypt = require("bcrypt");

let registration = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({ messege: "User already exists", success: false });
    }

    let newUser = new User({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    res.status(201).json({ messege: "Reguster Successfull", success: true });
  } catch (error) {
    res.status(500).json({ messege: error.messege, success: false });
  }
};

let login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ messege: "Auth failed", success: false });
    }

    let isPass = await bcrypt.compare(password, user.password);

    if (!isPass) {
      return res.status(403).json({ messege: "Auth failed", success: false });
    }

    let jwtToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({
        messege: "Loginnnn Successfull",
        success: true,
        email,
        jwtToken,
        name: user.name,
      });
  } catch (error) {
    res.status(500).json({ messege: error.messege, success: false });
  }
};

module.exports = {
  registration,
  login,
};
