import { Request, Response } from "express";
import { validationResult } from "express-validator";
import dotenv from 'dotenv';
import { registerUser } from "@/services/auth.services";
import { loginUser } from "@/services/auth.services";

dotenv.config();


export const registerUserAction = async (req: Request, res: Response): Promise<void> => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { username, email, password } = req.body;

    try {
        const userRes = await registerUser({email, username, password})
        res.json({ message: "User registered successfully", user: userRes });
    } catch (error) {
        res.status(500).json({ message: `There was an error ${error}` });
    }
}

export const loginUserAction = async (req: Request, res: Response): Promise<void> => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { email, password } = req.body;

    try {
        const tokenRes = await loginUser({email, password})

        res.status(200).json({ message: "Login successful", tokenRes });
    } catch (error) {
        //TODO: It can be a server error or credentials error, how can I handles that logic for errors in the try catch
        res.status(500).json({ message: "Server error" + error });
    }
};