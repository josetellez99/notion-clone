import { Request, Response, NextFunction } from "express";
import { getAllUserPages, getPage, createPage, updatePage, deletePage } from "@/services/page.services";
import { successResponse } from "@/utils/apiResponse";
import { HTTP_STATUS } from "@/utils/httpStatus";

export const getAllUserPagesAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const pagesRes = await getAllUserPages(userId);
        return successResponse(res, pagesRes, "Pages fetched successfully", HTTP_STATUS.CREATED);
    } catch (error) {
        next(error);
    }
};

export const getPageByIdAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pageId } = req.params;
        const pageRes = await getPage(pageId);
        res.json({ ...pageRes });
    } catch (error) {
        next(error);
    }
};

export const createPageAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ...newPage } = req.body;
        const pageRes = await createPage(newPage);
        res.json({ ...pageRes });
    } catch (error) {
        next(error);
    }
};

export const updatePageAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ...newPage } = req.body;
        const { id } = req.params;
        const pageRes = await updatePage(id, newPage);
        res.json({ ...pageRes });
    } catch (error) {
        next(error);
    }
};

export const deletePageAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const pageRes = await deletePage(id);
        res.json({ ...pageRes });
    } catch (error) {
        next(error);
    }
};
