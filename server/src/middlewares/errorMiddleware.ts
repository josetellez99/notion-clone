import { Request, Response } from "express";
import { mapErrorToApiResponse } from "@/utils/apiErrorMapper";

/**
 * Express middleware for centralized error handling.
 */
export function errorHandler(err: unknown, req: Request, res: Response) {
    const apiError = mapErrorToApiResponse(err);
    res.status(apiError.statusCode).json({
        error: apiError.message,
        details: apiError.details,
    });
}
