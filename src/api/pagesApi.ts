import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/utils/constants";
import { Page } from "@shared/types";

export const fetchPages = async (body: { userId: number}) => {
    return apiClient<Page[]>(API_ENDPOINTS.PAGES, 'GET', undefined, body)
}