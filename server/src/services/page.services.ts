import { createPageDB, deletePageDb, fetchUserPages, updatePageDB } from "@/db/repositories/pages";
import { Page } from "@/db/types";

export const getAllUserPages = async (userId: string) => {
    const res = await fetchUserPages(userId)
    return res.rows
}

export const createPage = async (data: Partial<Page>) => {
    const res = await createPageDB(data)
    return res.rows[0]
}

export const updatePage = async (pageId: string, data: Partial<Page>) => {
    const res = await updatePageDB(pageId, data)
    return res
}

export const deletePage = async (pageId: string) => {
    const res = await deletePageDb(pageId)
    return res
}