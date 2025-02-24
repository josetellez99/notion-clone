import { BASE_API_URL } from "@/utils/constants";

export const apiClient = async <T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    headers?: object,
    body?: object
): Promise<T> => {

    const res = await fetch(`${BASE_API_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

    return res.json();
};
