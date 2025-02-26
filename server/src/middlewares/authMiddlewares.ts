import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: string | object;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {

    // const token = req.header("Authorization")?.split(" ")[1];

    // if (!token) {
    //     res.status(401).json({ message: "Access denied. No token provided." });
    //     return
    // }

    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    //     req.user = decoded;
    //     next();
    // } catch (err) {
    //     res.status(403).json({ message: "Invalid token" + err });
    // }
    next()
};
