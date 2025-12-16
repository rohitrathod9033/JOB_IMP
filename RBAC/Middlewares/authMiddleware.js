// Protected Route
let jwt = require("jsonwebtoken");

let ensureToken = (req, res, next) => {
  let token;
  let bearerHeader = req.headers["authorization"];

  if (bearerHeader && bearerHeader.startsWith("Bearer")) {
    token = bearerHeader.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "Auth Failed", success: false });
    }

    // Token Mile to Decode karo
    try {
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("Here is Decoded User : " + req.user);
      console.log("Here is Decoded Token " + decoded);
      next()
    } catch (error) {
      return res.status(403).json({ message: "Invalid Token Enter", success: false });
    }
  } else {
    res.status(403).json({ message: "Require Token for Authorization", success: false });
  }
};
module.exports = ensureToken ;
