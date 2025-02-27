import { ApiError } from "@/errors/apiErrors";
import { UniqueConstraintError, NotFoundError, CircularReferenceError } from "@/errors/databaseErrors";

/**
 * Maps known application errors to API-friendly responses.
 */
export function mapErrorToApiResponse(error: unknown): ApiError {
    if (error instanceof ApiError) {
        return error; // Already formatted as an API error
    }

    if (error instanceof UniqueConstraintError) {
        return new ApiError(error.message, 409); // Conflict
    }

    if (error instanceof NotFoundError) {
        return new ApiError(error.message, 404); // Not Found
    }

    if (error instanceof CircularReferenceError) {
        return new ApiError(error.message, 400); // Bad Request
    }

    if (error instanceof Error) {
        return new ApiError("Internal Server Error", 500, error.message);
    }

    return new ApiError("An unexpected error occurred", 500);
}
