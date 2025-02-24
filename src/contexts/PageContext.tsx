import { Page } from "@shared/types";
import { useState, useEffect, createContext, ReactNode } from "react";

interface PageContextProps {
    pages: Partial<Page>[];
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

    return (
        <PageContext.Provider value={ {pages} as PageContextProps}>
            {children}
        </PageContext.Provider>
    )

}