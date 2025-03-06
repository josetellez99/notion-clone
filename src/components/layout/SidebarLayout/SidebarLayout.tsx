import { useEffect } from 'react'
import { Sidebar } from "@/components/layout/Sidebar/Sidebar"
import { Outlet } from "react-router-dom"
import styles from './SidebarLayout.module.css'
import { usePages } from "@/hooks/usePages"

export const SidebarLayout = () => {

        const { getPages } = usePages()

        useEffect(() => {
            getPages(1)
        }, [])


    return (
        <div className={styles.container}>
            <Sidebar />
            <main className={styles.page_container}>
                <Outlet />
            </main>
        </div>
    )
}