import { usePages } from "@/hooks/usePages"
import { useEffect } from "react"

export const AppPage =  () => {

    const { getPages, pages } = usePages()

    useEffect(() => {
        getPages(1)
    }, [])

    console.log(pages)

    return (
        <p>Hello world ajjaj</p>
    )
}