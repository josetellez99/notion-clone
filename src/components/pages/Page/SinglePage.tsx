import { useState, useEffect} from "react"
import { Page as PageType } from "@/types/pages"
import { usePages } from "@/hooks/usePages"
import { useParams } from "react-router-dom"
import styles from './Page.module.css'

export const SinglePage = () => {

    const { getSinglePage } = usePages()
    const { id } = useParams()

    const [page, setPage] = useState<PageType>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const init = async () => {
            const res = await getSinglePage(Number(id))
            setPage(res)
            setLoading(false)
        }
        init()
    }, [id])


    if(loading) {
        return <p>Cargando...</p>
    }

    if(!page) {
        return <p>There was an error.</p>
    }

    return (
        <p className={styles.name}>{page.name}</p>
    )
}