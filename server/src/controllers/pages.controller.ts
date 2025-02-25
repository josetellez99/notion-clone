import { Request, Response } from "express";
import { createPage, getAllUserPages, updatePage, deletePage, getPage } from "@/services/page.services";

export const getAllUserPagesAction = async (req: Request, res: Response): Promise<void> => {

    const { userId } = req.params;

    try {
        const pagesRes = await getAllUserPages(userId)
        res.json({ pagesRes });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
}

export const getPageByIdAction = async (req: Request, res: Response): Promise<void> => {

    const { pageId } = req.params;

    try {
        const pagesRes = await getPage(pageId)
        res.json({ pagesRes });
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