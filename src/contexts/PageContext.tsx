import { Page } from "@shared/types";
import { useState, useEffect, createContext, ReactNode } from "react";
import { fetchPages } from "@/api/pagesApi";

interface PageContextProps {
    pages: Partial<Page>[];
    loading: boolean;
    addPage: (new_page: Partial<Page>) => void;
    deletePage: (id: string) => void;
    updatePage: (id: string, updatePage: Partial<Page>) => void;
    getPages: (user_id: string) => void
}

export const PageContext = createContext<PageContextProps | null>(null)

interface PagesProviderProps {
    children: ReactNode;
}

export const PagesProvider = ({children} : PagesProviderProps) => {

    const [pages, setPages] = useState<Page[] | null>(null)
    const [loading, setLoading] = useState(false)

    const getPages = async (userId: number) => {

        const body = {
            userId
        }

        try {
            setLoading(true)
            const pages = await fetchPages(body)
            setPages(pages)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const addPage = async (newPage: Partial<Page>) => {

    }

    const deletePage = async (pageId: string) => {

    }

    const updatePage = async (newPage: Partial<Page>) => {

    }


    const data = {
        pages,
        loading,
        getPages,
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