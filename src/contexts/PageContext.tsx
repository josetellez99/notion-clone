import { Page } from "@/types/pages";
import React, { useState, createContext, ReactNode } from "react";
import { fetchPages, createPage, fetchPage, updatePageDB } from "@/api/pagesApi";

interface PageContextProps {
    pages: Partial<Page>[];
    setPages: React.Dispatch<React.SetStateAction<Page[] | null>>;
    currentPage: Page | null;
    setCurrentPage: React.Dispatch<React.SetStateAction<Partial<Page> | null>>
    updatePagesData: <K extends keyof Page>(field: K, newValue: Page[K], index: number) => void;
    addPage: (new_page: Partial<Page>) => Promise<Page>;
    deletePage: (id: string) => void;
    updatePage: (id: string, updatePage: Partial<Page>) => void;
    getPages: (user_id: number) => void;
    getCurrentPage: (page_id: number) => void;
    currentPageIndex: number | null;
    setCurrentPageIndex: React.Dispatch<React.SetStateAction<number | null>>
}

export const PageContext = createContext<PageContextProps | null>(null)

interface PagesProviderProps {
    children: ReactNode;
}

export const PagesProvider = ({ children }: PagesProviderProps) => {

    const [pages, setPages] = useState<Page[] | null>(null)
    const [currentPage, setCurrentPage] = useState<Partial<Page> | null>(null)
    const [currentPageIndex, setCurrentPageIndex] = useState<number | null>(null)

    let updateTimeout: NodeJS.Timeout | null = null

    const syncPageDB = (newPage: Partial<Page>, page_id: number) => {
        if (updateTimeout) clearTimeout(updateTimeout)
        updateTimeout = setTimeout(async () => {
            await updatePageDB(newPage, page_id)
        }, 800)
    }

    const updatePagesData = async <K extends keyof Page>(field: K, newValue: Page[K], index: number): Promise<void> => {
        const newPages = [...pages || []];
        const newPage = newPages[index!];
        newPage[field] = newValue;
        newPages[index] = newPage
        setPages(newPages)

        if (index === currentPageIndex) setCurrentPage(newPage)
        syncPageDB(newPage, newPage.id)
    }

    const getPages = async (userId: number) => {

        try {
            const res = await fetchPages(userId)
            setPages(res)
        } catch {
            console.log('error')
        }
    }

    const getCurrentPage = async (pageId: number) => {
        if (currentPageIndex) {
            const page = pages![currentPageIndex]
            setCurrentPage(page)
        } else {
            const page = pages?.find(p => p.id === pageId)
            if (page) {
                setCurrentPage(page)
            }
            const fetchedPage = await fetchPage(pageId)
            setCurrentPage(fetchedPage)
        }
    }

    const addPage = async (newPage: Partial<Page>) => {
        try {
            return await createPage(newPage)
        } catch {
            console.log('error')
        }
    }

    const deletePage = async (pageId: string) => {
        try {
            console.log(pageId)
        } catch {
            console.log('error')
        }
    }

    const updatePage = async (newPage: Partial<Page>) => {
        try {
            console.log(newPage)
        } catch {
            console.log('error')
        }
    }


    const data = {
        pages,
        setPages,
        currentPage,
        setCurrentPage,
        updatePagesData,
        getPages,
        getCurrentPage,
        addPage,
        deletePage,
        updatePage,
        currentPageIndex,
        setCurrentPageIndex
    }

    return (
        <PageContext.Provider value={data as PageContextProps}>
            {children}
        </PageContext.Provider>
    )

}