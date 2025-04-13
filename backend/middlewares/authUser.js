import jwt from "jsonwebtoken";

const authUser= async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized. Please log in again." });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id; 
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Forbidden. Invalid user credentials." });
        }
        next();
    } catch (error) {
        console.log("Error in authAdmin:", error);
        res.status(500).json({ success: false, message: "Authentication error" });
    }
};

export default authUser;
