export const handleApiError = (error: unknown) => {
    const err = error as Error & { status?: number; details?: unknown };

    switch (err.status) {
        case 400:
            return { message: err.message, type: "validation" };
        case 401:
            return { message: "Unauthorized", type: "auth" };
        case 500:
            return { message: "Server error", type: "generic" };
        default:
            return { message: "Unexpected error", type: "unknown" };
    }
};
