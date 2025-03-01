import styles from './SectionHeader.module.css'
import { DefaultCard } from '@/components/reusables/DefaultCard/DefaultCard'
import { usePages } from '@/hooks/usePages'
import { Page } from '@/types/pages'

const newPage: Partial<Page> = {
    name: '',
    user_id: 1,
}

export const SidebarSectionHeader = () => {

    const { addPage } = usePages()

    const handleCick = async () => {

        try {
            const res = await addPage(newPage)
            console.log(res)

            // TODO: add the new page to the pages state
            // TODO: navigate to the new page
            // TODO: sync the data to edit and send to the database in real time
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
                    <button onClick={handleCick}>+</button>
                </div>
            </div>
        </DefaultCard>
    )
}