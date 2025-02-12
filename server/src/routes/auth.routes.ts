import express from "express";
import { body } from "express-validator";

import { registerUser, loginUser } from "@/actions/auth";

const router = express.Router();

// User registration
router.post(
    "/register",
    [
        body("username").notEmpty(),
        body("email").isEmail(),
        body("password").isLength({ min: 6 }),
    ],
    registerUser
);

// User login
router.post(
    "/login",
    [body("email").isEmail(), body("password").notEmpty()],
    loginUser
);

export default router;
