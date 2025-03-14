import { Page, PageRendering } from "@/types/pages"

export const pagesRenderTree = (pages: Page[]): PageRendering[] => {

    // create the structure hierarchical JSON for nested pages
    const pagesMap = new Map()

    pages.forEach((page) => {
        pagesMap.set(page.id, { ...page, children: [] })
    })

    const parentPages: PageRendering[] = []

    pages.forEach((page) => {
        if (page.parent_page_id) {
            const parentPage = pagesMap.get(page.parent_page_id)
            if (parentPage) {
                parentPage.children.push(pagesMap.get(page.id))
            }
        } else {
            parentPages.push(pagesMap.get(page.id))
        }
    })

    return parentPages
}