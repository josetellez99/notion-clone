import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { createUser, getUserByEmail } from "@/db/repositories/users";

dotenv.config();


export const registerUser = async (req: Request, res: Response): Promise<void> => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await getUserByEmail(email)
        if (userExists.rows.length > 0) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const newUser = await createUser({ username, email, hashedPassword })

        res.json({ message: "User registered successfully", user: newUser.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        const userExists = await getUserByEmail(email)
        if (userExists.rows.length === 0) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const user = userExists.rows[0];

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};