import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/utils/constants";
import { Page } from "@/types/pages";
import { BASE_API_URL } from "@/utils/constants";

export const fetchPages = async (userId: number) => {
    const url = `${BASE_API_URL}/${API_ENDPOINTS.PAGES}/${userId}`
    return apiClient<{pages: Page[]}>(url, 'GET')
}