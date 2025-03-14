import { Page } from "@/types/pages";
import React, { useState, createContext, ReactNode } from "react";
import { fetchPages, createPage, fetchPage, updatePageDB } from "@/api/pagesApi";

interface PageContextProps {
    pages: PagesState;
    loading: boolean;
    setPages: React.Dispatch<React.SetStateAction<PagesState | null>>;
    currentPage: Page | null;
    setCurrentPage: React.Dispatch<React.SetStateAction<Partial<Page> | null>>
    updatePagesData: <K extends keyof Page>(field: K, newValue: Page[K], index: number) => void;
    addPage: (new_page: Partial<Page>) => Promise<Page>;
    deletePage: (id: string) => void;
    updatePage: (id: string, updatePage: Partial<Page>) => void;
    getPages: (user_id: number) => void;
    getCurrentPage: (page_id: number) => void;
}

export const PageContext = createContext<PageContextProps | null>(null)

export interface PagesState {
    [id: number]: Page
}

interface PagesProviderProps {
    children: ReactNode;
}

export const PagesProvider = ({ children }: PagesProviderProps) => {

    const [pages, setPages] = useState<PagesState | null>(null)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState<Partial<Page> | null>(null)

    let updateTimeout: NodeJS.Timeout | null = null

    const syncPageDB = (newPage: Partial<Page>, page_id: number) => {
        if (updateTimeout) clearTimeout(updateTimeout)
        updateTimeout = setTimeout(async () => {
            await updatePageDB(newPage, page_id)
        }, 800)
    }

    const updatePagesData = async <K extends keyof Page>(field: K, newValue: Page[K], id: number): Promise<void> => {

        const newPages = { ...pages || {} };
        const newPage = newPages[id!];
        newPage[field] = newValue;
        newPages[id] = newPage
        setPages(newPages)

        syncPageDB(newPage, newPage.id)
    }

    const getPages = async (userId: number) => {

        setLoading(true)
        try {
            const res = await fetchPages(userId)
            const formattedPages: PagesState = {}
            res.forEach(page => {
                formattedPages[page.id] = page
            })
            setPages(formattedPages)
        } catch {
            console.log('error')
        } finally {
            setLoading(false)
        }
    }

    const getCurrentPage = async (pageId: number) => {
        if(!pages) return
        const currentPage = pages[pageId]
        if (!currentPage) {
            const fetchedPage = await fetchPage(pageId)
            setCurrentPage(fetchedPage)
            return
        }
        setCurrentPage(currentPage)
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
        loading,
        setPages,
        currentPage,
        setCurrentPage,
        updatePagesData,
        getPages,
        getCurrentPage,
        addPage,
        deletePage,
        updatePage,
    }

    return (
        <PageContext.Provider value={data as PageContextProps}>
            {children}
        </PageContext.Provider>
    )

}