import { Request, Response } from "express";
import { getAllUserPages } from "@/services/page.services";

export const getAllUserPagesAction = async (req: Request, res: Response): Promise<void> => {

    const { userId } = req.body;

    try {
        const pagesRes = getAllUserPages(userId)
        res.json({ pages: pagesRes });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
}