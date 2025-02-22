import { PageContext } from "@/contexts/PageContext"
import { useContext } from "react"

export const usePages = () => {
    const context = useContext(PageContext)
    if(!context) {
        throw new Error("PageContext must be used within PageProvider")
    }
    return context
}