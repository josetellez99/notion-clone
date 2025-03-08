import styles from './SectionHeader.module.css'
import { DefaultCard } from '@/components/reusables/DefaultCard/DefaultCard'
import { usePages } from '@/hooks/usePages'
import { Page } from '@/types/pages'
import { useNavigate } from "react-router-dom";

const newPage: Partial<Page> = {
    name: '',
    user_id: 1,
}

export const SidebarSectionHeader = () => {

    const navigate = useNavigate()

    const { addPage, setPages, setCurrentPage } = usePages()

    const handleAddPageClick = async () => {

        try {
            const res = await addPage(newPage)
            setCurrentPage(res)
            setPages((prev) => ({
                ...prev,
                [res.id]: res
            }))
            navigate(`/page/${res.id}`)
        } catch {
            console.log('error')
        }
    }

    return (
        <DefaultCard>
            <div className={styles.sidebar_title_section_container}>
                <span>
                    Private
                </span>
                <div>
                    <button onClick={handleAddPageClick}>+</button>
                </div>
            </div>
        </DefaultCard>
    )
}