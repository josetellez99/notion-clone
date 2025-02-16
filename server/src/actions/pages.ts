import { fetchUserPages } from "@/db/repositories/pages";
import { Request, Response } from "express";

export const sendUserPages = async (req: Request, res: Response): Promise<void> => {

    const { userId } = req.body;

    try {
        const pagesRes = fetchUserPages(userId)
        res.json({ pages: pagesRes });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
}