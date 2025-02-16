import express from "express";
import { body } from "express-validator";

import { registerUserAction, loginUserAction } from "@/controllers/auth.controller";

const router = express.Router();

// User registration
router.post(
    "/register",
    [
        body("username").notEmpty(),
        body("email").isEmail(),
        body("password").isLength({ min: 6 }),
    ],
    registerUserAction
);

// User login
router.post(
    "/login",
    [body("email").isEmail(), body("password").notEmpty()],
    loginUserAction
);

export default router;
