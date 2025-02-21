import { Sidebar } from "@/components/layout/Sidebar/Sidebar"
import { Outlet } from "react-router-dom"
import styles from './SidebarLayout.module.css'

export const SidebarLayout = () => {
    return (
        <div className={styles.container}>
            <Sidebar />
            <main className={styles.page_container}>
                <Outlet />
            </main>
        </div>
    )
}