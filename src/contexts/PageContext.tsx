import { Page } from "@/types/pages";
import React, { useState, createContext, ReactNode } from "react";
import { fetchPages, fetchPage, createPage } from "@/api/pagesApi";

interface PageContextProps {
    pages: Partial<Page>[];
    setPages: React.Dispatch<React.SetStateAction<Page[] | null>>;
    updatePagesData: <K extends keyof Page>(field: K, newValue: Page[K], index: number) => void;
    addPage: (new_page: Partial<Page>) => Promise<Page>;
    deletePage: (id: string) => void;
    updatePage: (id: string, updatePage: Partial<Page>) => void;
    getPages: (user_id: number) => void;
    getSinglePage: (page_id: number) => Promise<Page | undefined>;
    currentPageIndex: number | null;
    setCurrentPageIndex: React.Dispatch<React.SetStateAction<number | null>>
}

export const PageContext = createContext<PageContextProps | null>(null)

interface PagesProviderProps {
    children: ReactNode;
}

export const PagesProvider = ({ children }: PagesProviderProps) => {

    const [pages, setPages] = useState<Page[] | null>(null)
    const [currentPageIndex, setCurrentPageIndex] = useState<number | null>(null)

    const updatePagesData = <K extends keyof Page>(field: K, newValue: Page[K], index: number): void => {
        const newPages = [...pages || []]
        newPages[index!][field] = newValue
        setPages(newPages)
    }

    const getPages = async (userId: number) => {

        try {
            const res = await fetchPages(userId)
            setPages(res)
        } catch {
            console.log('error')
        }
    }

    const getSinglePage = async (pageId: number): Promise<Page | undefined> => {
        try {
            return await fetchPage(pageId)
        } catch (error) {
            console.log(error)
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
        updatePagesData,
        getPages,
        getSinglePage,
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