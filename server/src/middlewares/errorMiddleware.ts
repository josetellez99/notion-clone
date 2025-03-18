import { Request, Response } from "express";
import { mapErrorToApiResponse } from "@/utils/apiErrorMapper";
import { errorResponse } from "@/utils/apiResponse";

/**
 * Express middleware for centralized error handling.
 */
export function errorHandler(err: unknown, req: Request, res: Response) {
    const apiError = mapErrorToApiResponse(err);
    errorResponse(res, apiError.message, apiError.statusCode, apiError.details )
}