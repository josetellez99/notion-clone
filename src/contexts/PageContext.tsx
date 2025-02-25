import { Page } from "@/types/pages";
import { useState, createContext, ReactNode } from "react";
import { fetchPages, fetchPage } from "@/api/pagesApi";

interface PageContextProps {
    pages: Partial<Page>[];
    loadingPages: boolean;
    loadingSinglePage: boolean;
    loadingAdd: boolean;
    loadingDelete: boolean;
    loadingUpdate: boolean;
    addPage: (new_page: Partial<Page>) => void;
    deletePage: (id: string) => void;
    updatePage: (id: string, updatePage: Partial<Page>) => void;
    getPages: (user_id: number) => void;
    getSinglePage: (page_id: number) => Page
}

export const PageContext = createContext<PageContextProps | null>(null)

interface PagesProviderProps {
    children: ReactNode;
}

export const PagesProvider = ({ children }: PagesProviderProps) => {

    const [pages, setPages] = useState<Page[] | null>(null)
    const [loadingPages, setLoadingPages] = useState(false);
    const [loadingSinglePage, setLoadingSinglePage] = useState(false)
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    console.log(pages)

    const getPages = async (userId: number) => {

        try {
            setLoadingPages(true)
            const res = await fetchPages(userId)
            setPages(res.pages)
        } catch {
            console.log('error')
        } finally{
            setLoadingPages(false)
        }
    }

    const getSinglePage = async (pageId: number): Page => {
        try {
            setLoadingSinglePage(true)
            const res = await fetchPage(pageId)
            return res.page
        } catch {
            console.log('error')
        } finally {
            setLoadingSinglePage(false)
        }
    }

    const addPage = async (newPage: Partial<Page>) => {
        try {
            setLoadingAdd(true)
            console.log(newPage)
        } catch {
            console.log('error')
        } finally {
            setLoadingAdd(false)
        }
    }

    const deletePage = async (pageId: string) => {
        try {
            setLoadingDelete(true)
            console.log(pageId)
        } catch {
            console.log('error')
        } finally {
            setLoadingDelete(false)
        }
    }

    const updatePage = async (newPage: Partial<Page>) => {
        try {
            setLoadingUpdate(true)
            console.log(newPage)
        } catch {
            console.log('error')
        } finally {
            setLoadingUpdate(false)
        }
    }


    const data = {
        pages,
        loadingPages,
        loadingSinglePage,
        loadingAdd,
        loadingDelete,
        loadingUpdate,
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