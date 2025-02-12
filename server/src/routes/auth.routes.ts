import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { pool } from "@/db/pool";
import { createUser } from "@/db/repositories/users";

const router = express.Router();

// User registration
router.post(
    "/register",
    [
        body("username").notEmpty(),
        body("email").isEmail(),
        body("password").isLength({ min: 6 }),
    ],
    async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { username, email, password } = req.body;

        try {
            // Check if the user already exists
            const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
            if (userExists.rows.length > 0) {
                res.status(400).json({ message: "User already exists" });
                return;
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Insert new user
            const newUser = await createUser({username, email, hashedPassword})

            res.json({ message: "User registered successfully", user: newUser.rows[0] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

// User login
router.post(
    "/login",
    [body("email").isEmail(), body("password").notEmpty()],
    async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { email, password } = req.body;

        try {
            // Find user
            const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
            if (user.rows.length === 0) {
                res.status(400).json({ message: "Invalid credentials" });
                return;
            }

            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.rows[0].password);
            if (!isMatch) {
                res.status(400).json({ message: "Invalid credentials" });
                return;
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user.rows[0].id }, "your_jwt_secret", {
                expiresIn: "1h",
            });

            res.json({ token, user: user.rows[0] });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);

export default router;
