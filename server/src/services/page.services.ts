import { createPageDB, deletePageDb, fetchUserPages, updatePageDB } from "@/db/repositories/pages";
import { Page } from "@/db/types";

export const getAllUserPages = async (userId: string) => {
    const res = await fetchUserPages(userId)
    const pages = res.rows

    const pagesMap = new Map()

    pages.forEach((page) => {
        pagesMap.set(page.id, {...page, children: []})
    })

    const parentPages: Page[] = []

    pages.forEach((page) => {
        if(page.parent_page_id) {
            const parentPage = pagesMap.get(page.parent_page_id)
            if(parentPage) {
                parentPage.children.push(pagesMap.get(page.id))
            }
        } else {
            parentPages.push(pagesMap.get(page.id))
        }
    })

    return parentPages
}

export const createPage = async (data: Partial<Page>) => {
    const res = await createPageDB(data)
    return res.rows[0]
}

export const updatePage = async (pageId: string, data: Partial<Page>) => {
    const res = await updatePageDB(pageId, data)
    return res?.rows[0]
}

export const deletePage = async (pageId: string) => {
    const res = await deletePageDb(pageId)
    return res?.rows[0]
}