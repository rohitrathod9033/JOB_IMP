import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || "";
let ensureToken = (req, res, next) => {
    let token;
    let bearerToken = req.headers["authorization"];
    if (bearerToken && bearerToken.startsWith("Bearer")) {
        token = bearerToken.split(" ")[1];
        if (!token) {
            return res
                .status(403)
                .json({ message: "Wrong Token Entered", success: false });
        }
        // Decode Token
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;
            console.log("Decoded User", req.user);
            console.log(req.user);
            next();
        }
        catch (error) {
            return res
                .status(403)
                .json({ message: "Invalid Token Enter", success: false });
        }
    }
    else {
        return res.status(403).json({
            message: "Token Not Found || Require Token for Authorization",
            success: false,
        });
    }
};
export default ensureToken;
//# sourceMappingURL=tokenMiddleware.js.map