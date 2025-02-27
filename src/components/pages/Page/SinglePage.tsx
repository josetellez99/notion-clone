import { useState, useEffect} from "react"
import { Page as PageType } from "@/types/pages"
import { usePages } from "@/hooks/usePages"
import { useParams } from "react-router-dom"

export const SinglePage = () => {

    const { getSinglePage } = usePages()
    const { id } = useParams()

    const [page, setPage] = useState<PageType | undefined>(undefined)

    useEffect(() => {
        const init = async () => {
            const res = await getSinglePage(Number(id))
            setPage(res)
        }
        init()
    }, [])

    console.log(page)

    return (
        <p>Hello world, {id}</p>
    )

}