import React, { useState, useEffect } from "react"
import { Page as PageType } from "@/types/pages"
import { usePages } from "@/hooks/usePages"
import { useParams } from "react-router-dom"
import styles from './Page.module.css'

export const SinglePage = () => {

    const { getSinglePage, updatePagesData, currentPageIndex } = usePages()
    const { id } = useParams()

    const [page, setPage] = useState<PageType>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const init = async () => {
            const res = await getSinglePage(Number(id))
            if (res) {
                setPage(res)
            }
            setLoading(false)
        }
        init()
    }, [id])

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        if (page) {
            setPage({ ...page, name: newValue })
            updatePagesData('name', newValue, currentPageIndex!)
        }
    }


    if (loading) {
        return <p>Cargando...</p>
    }

    if (!page) {
        return <p>There was an error.</p>
    }

    return (
        <input
            className={styles.name}
            onChange={handleNameChange}
            value={page.name}
        />
    )
}