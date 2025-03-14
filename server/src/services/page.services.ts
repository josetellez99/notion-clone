import { createPageDB, deletePageDb, fetchUserPages, updatePageDB, checkCircularReferenceDB, fetchPage } from "@/db/repositories/pages.repositories";
import { Page, JoinedPage } from '@/types/pages';

export const getAllUserPages = async (userId: string) => {
    const res = await fetchUserPages(userId)
    const pages = res.rows

    return pages
}

export const getPage = async (page_id: string) => {
    const res = await fetchPage(page_id)
    return res?.rows[0]
}

export const createPage = async (data: Partial<Page>) => {

    const res = await createPageDB(data);
    const newPage = res.rows[0];

    if (!newPage) {
        throw new Error("Failed to create page.");
    }

    // Check for circular reference using the new ID
    const hasCircularReference = await checkCircularReferenceDB(newPage.id, newPage.parent_page_id);

    // If circular reference detected, delete the inserted page
    if (hasCircularReference) {
        await deletePageDb(newPage.id);
        throw new Error("Circular reference detected. Page creation rolled back.");
    }

    return newPage;
};

export const updatePage = async (pageId: string, data: Partial<JoinedPage>) => {

    const hasCircularReference = await checkCircularReferenceDB(pageId, data.parent_page_id);

    if(hasCircularReference) {
        throw new Error("Circular reference detected. Page creation rolled back.")
    }

    // Remove the children prop from the page object

    const { children, ...cleanPage} = data
    console.log(children)

    const res = await updatePageDB(pageId, cleanPage)
    return res?.rows[0]
}

export const deletePage = async (pageId: string) => {
    const res = await deletePageDb(pageId)
    return res?.rows[0]
}