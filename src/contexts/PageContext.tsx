import { Page } from "@shared/types";
import { useState, useEffect, createContext, ReactNode } from "react";

interface PageContextProps {
    pages: Page[]
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