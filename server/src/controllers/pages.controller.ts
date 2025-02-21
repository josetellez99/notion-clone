import { Request, Response } from "express";
import { createPage, getAllUserPages, updatePage, deletePage } from "@/services/page.services";

export const getAllUserPagesAction = async (req: Request, res: Response): Promise<void> => {

    const { userId } = req.body;

    try {
        const pagesRes = await getAllUserPages(userId)
        res.json({ pages: pagesRes });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
}

export const createPageAction = async (req: Request, res: Response): Promise<void> => {
    
    const {...newPage} = req.body

    try {
        const pageRes = await createPage(newPage)
        res.json({pageRes})
    } catch {
        res.status(500).json({ message: "Server error" });
    }
}

export const updatePageAction = async (req: Request, res: Response): Promise<void> => {
    
    const { ...newPage } = req.body
    const id = req.params.id

    try {
        const pageRes = await updatePage(id, newPage)
        res.json({pageRes})
    } catch {
        res.status(500).json({ message: "Server error" });
    }
}

export const deletePageAction = async (req: Request, res: Response): Promise<void> => {
    
    const id = req.params.id

    try {
        const pageRes = await deletePage(id)
        res.json({pageRes})
    } catch {
        res.status(500).json({ message: "Server error" });
    }
}