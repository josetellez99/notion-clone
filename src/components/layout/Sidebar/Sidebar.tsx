import styles from './Sidebar.module.css'
import { usePages } from "@/hooks/usePages"
import { useEffect } from 'react'

export const Sidebar = () => {

    const { getPages, pages, loadingPages } = usePages()

    useEffect(() => {
        getPages(1)
    }, [])

    return (
        <aside className={styles.sidebar}>
            {loadingPages ? (
                <p>Cargando...</p>
            ) : (
                <ul>
                    {pages && pages.map(page => (
                        <li
                            key={page.id}
                        >
                            {page.name}
                        </li>
                    ))}
                </ul>
            )}
        </aside>
    )
}