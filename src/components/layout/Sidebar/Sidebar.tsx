import styles from './Sidebar.module.css'
import { usePages } from "@/hooks/usePages"
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { SidebarSectionHeader } from '@/components/layout/Sidebar/SectionHeader/SectionHeader';

export const Sidebar = () => {

    const navigate = useNavigate()

    const { getPages, pages } = usePages()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const init = async () => {
            await getPages(1)
            setLoading(false)
        }
        init()

    }, [])

    const handlePageClick = (id: number) => {
        navigate(`/page/${id}`)
    }

    return (
        <aside className={styles.sidebar}>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    <SidebarSectionHeader />
                    <ul>
                        {pages && pages.map(page => (
                            <li
                                key={page.id}
                                onClick={() => handlePageClick(page.id!)}
                            >
                                {page.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </aside>
    )
}