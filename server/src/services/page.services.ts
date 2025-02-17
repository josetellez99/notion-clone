import { fetchUserPages } from "@/db/repositories/pages";

export const getAllUserPages = async (userId: string) => {
    const res = await fetchUserPages(userId)
    return res.rows
}