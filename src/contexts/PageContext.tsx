import { Page } from "@/types/pages";
import { useState, createContext, ReactNode } from "react";
import { fetchPages } from "@/api/pagesApi";

interface PageContextProps {
    pages: Partial<Page>[];
    loading: boolean;
    addPage: (new_page: Partial<Page>) => void;
    deletePage: (id: string) => void;
    updatePage: (id: string, updatePage: Partial<Page>) => void;
    getPages: (user_id: number) => void
}

export const PageContext = createContext<PageContextProps | null>(null)

interface PagesProviderProps {
    children: ReactNode;
}

export const PagesProvider = ({children} : PagesProviderProps) => {

    const [pages, setPages] = useState<Page[] | null>(null)
    const [loading, setLoading] = useState(false)

    const getPages = async (userId: number) => {

        try {
            setLoading(true)
            const pages = await fetchPages(userId)
            setPages(pages)
        } catch {
            setLoading(false)
        }
    }

    const addPage = async (newPage: Partial<Page>) => {
        console.log(newPage)

    }

    const deletePage = async (pageId: string) => {
        console.log(pageId)
    }

    const updatePage = async (newPage: Partial<Page>) => {
        console.log(newPage)
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