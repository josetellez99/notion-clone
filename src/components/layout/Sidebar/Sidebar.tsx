import styles from './Sidebar.module.css'
import { usePages } from "@/hooks/usePages"
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {

    const navigate = useNavigate()

    const { getPages, pages, loadingPages } = usePages()

    useEffect(() => {
        const init = async () => {
            await getPages(1)
        }
        init()

    }, [])

    const handlePageClick = (id: number) => {
        navigate(`/page/${id}`)
    }

    return (
        <aside className={styles.sidebar}>
            {loadingPages ? (
                <p>Cargando...</p>
            ) : (
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
            )}
        </aside>
    )
}