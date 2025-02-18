import { createPageDB, fetchUserPages } from "@/db/repositories/pages";
import { Page } from "@/db/types";

export const getAllUserPages = async (userId: string) => {
    const res = await fetchUserPages(userId)
    return res.rows
}

export const createPage = async (data: Partial<Page>) => {
    const res = await createPageDB(data)
    return res.rows
}