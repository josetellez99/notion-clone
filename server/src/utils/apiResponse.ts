import { Response} from "express";


export const successResponse = (
    res: Response,
    data: unknown,
    message = "Request successful",
    statusCode = 200
) => {
    res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

export const errorResponse = (
    res: Response,
    message: string,
    statusCode = 500,
    details?: string
) => {
    return res.status(statusCode).json({
        success: false,
        message,
        details,
    });
};
