import styles from './Sidebar.module.css'
import { usePages } from "@/hooks/usePages"
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {

    const navigate = useNavigate()

    const { getPages, pages } = usePages()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
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