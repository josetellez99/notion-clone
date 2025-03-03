import styles from './Sidebar.module.css'
import { usePages } from "@/hooks/usePages"
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { SidebarSectionHeader } from '@/components/layout/Sidebar/SectionHeader/SectionHeader';
import { DefaultCard } from '@/components/reusables/DefaultCard/DefaultCard';

export const Sidebar = () => {

    const navigate = useNavigate()
    const { getPages, pages, setCurrentPageIndex, updatePagesData } = usePages()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const init = async () => {
            await getPages(1)
            setLoading(false)
        }
        init()

    }, [])

    const handlePageClick = (id: number, index: number) => {
        navigate(`/page/${id}`)
        setCurrentPageIndex(index)
    }

    const handleOnChangePageName = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValue = e.target.value
        updatePagesData('name', newValue, index!)
    }

    return (
        <aside className={styles.sidebar}>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    <SidebarSectionHeader />
                    <ul>
                        {pages && pages.map((page, index) => (
                            <li
                                key={page.id}
                                onClick={() => handlePageClick(page.id!, index)}
                            >
                                <DefaultCard>
                                    <input
                                        onChange={(e) => handleOnChangePageName(e, index)}
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