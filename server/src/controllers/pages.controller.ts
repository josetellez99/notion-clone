import { Request, Response, NextFunction } from "express";
import { getAllUserPages, getPage, createPage, updatePage, deletePage } from "@/services/page.services";
import { successResponse } from "@/utils/apiResponse";
import { HTTP_STATUS } from "@/utils/httpStatus";

export const getAllUserPagesAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const pagesRes = await getAllUserPages(userId);
        return successResponse(res, pagesRes, "Pages fetched successfully", HTTP_STATUS.OK);
    } catch (error) {
        next(error);
    }
};

export const getPageByIdAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { pageId } = req.params;
        const pageRes = await getPage(pageId);
        return successResponse(res, pageRes, "Page fetched successfully", HTTP_STATUS.OK);
    } catch (error) {
        next(error);
    }
};

export const createPageAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ...newPage } = req.body;
        const pageRes = await createPage(newPage);
        return successResponse(res, pageRes, "Page created successfully", HTTP_STATUS.CREATED);
    } catch (error) {
        next(error);
    }
};

export const updatePageAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ...newPage } = req.body;
        const { id } = req.params;
        const pageRes = await updatePage(id, newPage);
        return successResponse(res, pageRes, "Page updated successfully", HTTP_STATUS.OK);
    } catch (error) {
        next(error);
    }
};

export const deletePageAction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const pageRes = await deletePage(id);
        return successResponse(res, pageRes, "Page remove successfully", HTTP_STATUS.OK);
    } catch (error) {
        next(error);
    }
};
