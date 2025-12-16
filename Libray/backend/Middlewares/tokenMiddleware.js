import jwt from "jsonwebtoken";

const ensureToken = (req, res, next) => {
  let token;
  let bearerToken = req.headers["authorization"];

  if (bearerToken && bearerToken.startsWith("Bearer ")) {
    token = bearerToken.split(" ")[1];

    if (!token) {
      return res
        .status(403)
        .json({ message: "Wrong Token Entered", success: false });
    }

    // Decode Token
    try {
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("Token from TokenMiddleware", req.user);
      next();
    } catch (error) {
      return res
        .status(403)
        .json({ message: "Invalid Token Enter", success: false });
    }

  } else {
    return res.status(403).json({
      message: "Token Not Found || Require Token for Authorization",
      success: false,
    });
  }
};

export default ensureToken;
