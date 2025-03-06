import React, { useState, useEffect } from "react"
// import { Page as PageType } from "@/types/pages"
import { usePages } from "@/hooks/usePages"
import { useParams } from "react-router-dom"
import styles from './Page.module.css'

export const SinglePage = () => {

    const { updatePagesData, currentPage, getCurrentPage } = usePages()
    const { id } = useParams()
    const idAsNumber = Number(id)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const init = async () => {
            await getCurrentPage(idAsNumber)
            setLoading(false)
        }
        init()
    }, [id])

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        updatePagesData('name', newValue, idAsNumber)
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