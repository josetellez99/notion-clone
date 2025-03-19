import { Page } from "@/types/pages";
import React, { useState, createContext, ReactNode } from "react";
import { fetchPages, createPage, fetchPage, updatePageDB } from "@/api/pagesApi";
import { handleApiError } from "@/utils/helpers/apiErrors";

interface PageContextProps {
    pages: PagesState;
    loading: boolean;
    setPages: React.Dispatch<React.SetStateAction<PagesState | null>>;
    currentPage: Page | null;
    setCurrentPage: React.Dispatch<React.SetStateAction<Partial<Page> | null>>
    updatePagesData: <K extends keyof Page>(field: K, newValue: Page[K], index: number) => void;
    addPage: (new_page: Partial<Page>) => Promise<Page>;
    deletePage: (id: string) => void;
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

    const getPages = async (userId: number) => {

        setLoading(true)
        try {
            const res = await fetchPages(userId)
            const formattedPages: PagesState = {}
            res.forEach(page => {
                formattedPages[page.id] = page
            })
            setPages(formattedPages)
        } catch (e) {
            const error = handleApiError(e)
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const getCurrentPage = async (pageId: number) => {
        try {
            if (pages) {
                const currentPage = pages[pageId]
                if (!currentPage) {
                    setCurrentPage(currentPage)
                } else {
                    const res = await fetchPage(pageId)
                    setCurrentPage(res)
                }
            } else {
                const res = await fetchPage(pageId)
                setCurrentPage(res)
            }
        } catch (e) {
            const error = handleApiError(e)
            console.error(error)
        }
    }

    const addPage = async (newPage: Partial<Page>) => {
        try {
            const res = await createPage(newPage)
            // success message
            return res
        } catch {
            console.log('error')
        }
    }

    const updatePagesData = async <K extends keyof Page>(field: K, newValue: Page[K], id: number): Promise<void> => {

        const newPages = { ...pages || {} };
        const newPage = newPages[id!];
        newPage[field] = newValue;
        newPages[id] = newPage
        setPages(newPages)

        syncPageDB(newPage, newPage.id)
    }

    const deletePage = async (pageId: string) => {
        try {
            console.log(pageId)
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
    }

    return (
        <PageContext.Provider value={data as PageContextProps}>
            {children}
        </PageContext.Provider>
    )

}