import { createPageDB, deletePageDb, fetchUserPages, updatePageDB, checkCircularReferenceDB } from "@/db/repositories/pages.repositories";
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

    const res = await createPageDB(data);
    const newPage = res.rows[0];

    if (!newPage) {
        throw new Error("Failed to create page.");
    }

    // Step 2: Check for circular reference using the new ID
    const hasCircularReference = await checkCircularReferenceDB(newPage.id, newPage.parent_page_id);

    // Step 3: If circular reference detected, delete the inserted page
    if (hasCircularReference) {
        await deletePageDb(newPage.id);
        throw new Error("Circular reference detected. Page creation rolled back.");
    }

    return newPage;
};

export const updatePage = async (pageId: string, data: Partial<Page>) => {

    const hasCircularReference = await checkCircularReferenceDB(pageId, data.parent_page_id);

    if(hasCircularReference) {
        throw new Error("Circular reference detected. Page creation rolled back.")
    }

    const res = await updatePageDB(pageId, data)
    return res?.rows[0]
}

export const deletePage = async (pageId: string) => {
    const res = await deletePageDb(pageId)
    return res?.rows[0]
}