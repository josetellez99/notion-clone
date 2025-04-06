import styles from './Sidebar.module.css'
import { usePages } from "@/hooks/usePages"
import React, { useMemo, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import { SidebarSectionHeader } from '@/components/layout/Sidebar/SectionHeader/SectionHeader';
import { PageListElement } from '@/components/layout/Sidebar/PageListElement/PageListElement';
import { Page } from '@/types/pages';
import { pagesRenderTree } from '@/utils/helpers/pages';
import { DragAndDrogProvider } from '@/components/reusables/DragAndDropProvider/DragAndDropProvider';
import { reorderingArrayForDragDrop } from '@/utils/helpers/arrays'
import { PagesState } from '@/contexts/PageContext';

export const Sidebar = () => {

    const navigate = useNavigate()
    const { pages, setPages, updatePagesData, setCurrentPage, loading, addPage } = usePages()

    const treePagesRender = useMemo(() => {
        return pagesRenderTree(Object.values(pages || []))
    }, [pages])

    const handlePageClick = useCallback((e: React.MouseEvent<HTMLDivElement>, id: number) => {
        console.log(e)
        // e.stopPropagation()
        navigate(`/page/${id}`)
        const newCurrentPage = pages[id]
        setCurrentPage(newCurrentPage)
    }, [pages])

    const handleOnChangePageName = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const newValue = e.target.value
        updatePagesData('name', newValue, id!)
    }, [updatePagesData])

    const handleAddSubPage = useCallback(async (e: React.MouseEvent<HTMLButtonElement>, parentPageId: number) => {
        e.stopPropagation()

        const newSubPage: Partial<Page> = {
            name: '',
            user_id: 1,
            parent_page_id: parentPageId
        }
        const res = await addPage(newSubPage)
        const newPages = { ...pages }
        newPages[res.id] = res
        setPages(newPages)
        navigate(`/page/${res.id}`)
    }, [pages])

    const onReorder = (fromIndex: number, toIndex: number) => {
        const finalArray = reorderingArrayForDragDrop(treePagesRender, fromIndex, toIndex, 1)
        console.log(finalArray)
        if (!finalArray) return
        const formattedPages: PagesState = {}
        finalArray.forEach(page => {
            formattedPages[page.id] = page
        })
        console.log(formattedPages)
        setPages(formattedPages)
    }

    return (
        <aside className={styles.sidebar}>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    <SidebarSectionHeader />
                    <ul>
                        <DragAndDrogProvider
                            onReOrder={onReorder}
                        >
                            {treePagesRender.map((page) => (
                                <li key={page.id} >
                                    <PageListElement
                                        key={page.id}
                                        page={page}
                                        handleOnChangePageName={handleOnChangePageName}
                                        onClick={handlePageClick}
                                        onAddingSubPage={handleAddSubPage}
                                    />
                                    {/* {page.children && (
                                        <ul style={{ marginLeft: '12px' }}>
                                            {page.children.map(p => (
                                                <PageListElement
                                                    key={p.id}
                                                    page={p}
                                                    onClick={handlePageClick}
                                                    handleOnChangePageName={handleOnChangePageName}
                                                    onAddingSubPage={handleAddSubPage}
                                                />
                                            ))}
                                        </ul>
                                    )} */}
                                </li>
                            ))}
                        </DragAndDrogProvider>
                    </ul>
                </div>
            )}
        </aside>
    )
}