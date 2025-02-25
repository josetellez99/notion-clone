export const apiClient = async <T>(
    url: string,
    method: string = "GET",
    headers: Record<string, string> = {},
    body?: object
): Promise<T> => {
    const options: RequestInit = {
        method,
        headers: { "Content-Type": "application/json", ...headers },
    };

    if (body && method !== "GET") {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Network response was not ok");

    return response.json();
};

