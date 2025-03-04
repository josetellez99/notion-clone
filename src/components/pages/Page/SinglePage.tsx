import React, { useState, useEffect } from "react"
// import { Page as PageType } from "@/types/pages"
import { usePages } from "@/hooks/usePages"
import { useParams } from "react-router-dom"
import styles from './Page.module.css'

export const SinglePage = () => {

    const { updatePagesData, currentPageIndex, currentPage, getCurrentPage } = usePages()
    const { id } = useParams()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(currentPage) return
        setLoading(true)
        const init = async () => {
            await getCurrentPage(Number(id))
            setLoading(false)
        }
        init()
    }, [id])

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        updatePagesData('name', newValue, currentPageIndex!)
    }


    if (loading) {
        return <p>Cargando...</p>
    }

    if (!currentPage) {
        return <p>There was an error.</p>
    }

    return (
        <input
            className={styles.name}
            onChange={handleNameChange}
            value={currentPage.name}
        />
    )
}