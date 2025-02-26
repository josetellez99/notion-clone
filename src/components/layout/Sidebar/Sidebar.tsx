import styles from './Sidebar.module.css'
import { usePages } from "@/hooks/usePages"
import { useEffect } from 'react'

export const Sidebar = () => {

    const { getPages, pages, loadingPages, getSinglePage } = usePages()

    useEffect(() => {
        const init = async () => {
            await getPages(1)
            const page = await getSinglePage(5)
            console.log(page)
        }
        init()

    }, [])

    console.log(pages)

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