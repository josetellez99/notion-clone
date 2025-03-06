import styles from './Sidebar.module.css'
import { usePages } from "@/hooks/usePages"
import React from 'react'
import { useNavigate } from "react-router-dom";
import { SidebarSectionHeader } from '@/components/layout/Sidebar/SectionHeader/SectionHeader';
import { DefaultCard } from '@/components/reusables/DefaultCard/DefaultCard';

export const Sidebar = () => {

    const navigate = useNavigate()
    const { pages, updatePagesData, setCurrentPage, loading } = usePages()

    const handlePageClick = (id: number) => {
        navigate(`/page/${id}`)
        const newCurrentPage = pages[id]
        setCurrentPage(newCurrentPage)
    }

    const handleOnChangePageName = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const newValue = e.target.value
        updatePagesData('name', newValue, id!)
    }

    return (
        <aside className={styles.sidebar}>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    <SidebarSectionHeader />
                    <ul>
                        {pages && Object.values(pages).map((page) => (
                            <li
                                key={page.id}
                                onClick={() => handlePageClick(page.id!)}
                            >
                                <DefaultCard>
                                    <input
                                        onChange={(e) => handleOnChangePageName(e, page.id)}
                                        value={page.name || 'New page'}
                                    />
                                </DefaultCard>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </aside>
    )
}