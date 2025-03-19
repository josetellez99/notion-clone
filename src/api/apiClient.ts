import { ApiResponse } from "@/types/api";

export const apiClient = async <T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = "GET",
    headers: Record<string, string> = {},
    body?: object
): Promise<ApiResponse<T>> => {
    const options: RequestInit = {
        method,
        headers: { "Content-Type": "application/json", ...headers },
    };

    if (body && method !== "GET") {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || response.statusText;
        const errorDetails = errorData?.details || null;

        const err = new Error(errorMessage) as Error & { status?: number; details?: unknown };
        err.status = response.status;
        err.details = errorDetails;

        throw err;
    }

    return response.json();
};

