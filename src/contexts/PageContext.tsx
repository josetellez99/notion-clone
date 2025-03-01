import { Page } from "@/types/pages";
import { useState, createContext, ReactNode } from "react";
import { fetchPages, fetchPage, createPage } from "@/api/pagesApi";

interface PageContextProps {
    pages: Partial<Page>[];
    addPage: (new_page: Partial<Page>) => void;
    deletePage: (id: string) => void;
    updatePage: (id: string, updatePage: Partial<Page>) => void;
    getPages: (user_id: number) => void;
    getSinglePage: (page_id: number) => Promise<Page | undefined>
}

export const PageContext = createContext<PageContextProps | null>(null)

interface PagesProviderProps {
    children: ReactNode;
}

export const PagesProvider = ({ children }: PagesProviderProps) => {

    const [pages, setPages] = useState<Page[] | null>(null)

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
        getPages,
        getSinglePage,
        addPage,
        deletePage,
        updatePage
    }

    return (
        <PageContext.Provider value={data as PageContextProps}>
            {children}
        </PageContext.Provider>
    )

}