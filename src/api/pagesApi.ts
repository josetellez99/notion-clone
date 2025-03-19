import { apiClient } from "@/api/apiClient";
import { API_ENDPOINTS } from "@/utils/constants";
import { Page } from "@/types/pages";
import { BASE_API_URL } from "@/utils/constants";

export const fetchPages = async (userId: number) => {
    const url = `${BASE_API_URL}/${API_ENDPOINTS.PAGES}/user/${userId}`
    const res = await apiClient<Page[]>(url, 'GET')
    return res.data
}

export const fetchPage = async (page_id: number) => {
    const url = `${BASE_API_URL}/${API_ENDPOINTS.PAGE}/${page_id}`
    return apiClient<Page>(url, 'GET')
}

export const createPage = async (newPage: Partial<Page>): Promise<Page> => {
    const url = `${BASE_API_URL}/${API_ENDPOINTS.PAGES}`
    const body = {
        ...newPage
    }
    return apiClient<Page>(url, 'POST', undefined, body)
}

export const updatePageDB = async (updatedPage: Partial<Page>, page_id: number): Promise<Page> => {
    const url = `${BASE_API_URL}/${API_ENDPOINTS.PAGES}/${page_id}`
    const body = {
        ...updatedPage
    }
    return apiClient<Page>(url, 'PUT', undefined, body)
}