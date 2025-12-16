let jwt = require("jsonwebtoken");
require("dotenv").config();

let ensuretoken = (req, res, next) => {
  console.log(req.user);
  let token = req.headers["authorization"];  // token yahi se aayega

  if (!token) {
    return res.status(403).json({ messege: "Forbidden, JWT Requireddd......" });
  }

  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ messege: " JWT Expireddddd" });
  }
};

module.exports = ensuretoken;
