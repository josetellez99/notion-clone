import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { pool } from "@/index";

const router = express.Router();

// User registration
router.post(
    "/register",
    [
        body("username").notEmpty(),
        body("email").isEmail(),
        body("password").isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        try {
            // Check if the user already exists
            const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
            if (userExists.rows.length > 0) {
                return res.status(400).json({ message: "User already exists" });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Insert new user
            const newUser = await pool.query(
                "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
                [username, email, hashedPassword]
            );

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
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Find user
            const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
            if (user.rows.length === 0) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.rows[0].password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
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
