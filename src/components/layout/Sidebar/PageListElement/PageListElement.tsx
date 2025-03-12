import { useState } from 'react'
import { Page } from "@/types/pages"
import { DefaultCard } from '@/components/reusables/DefaultCard/DefaultCard';

interface props {
    page: Page;
    onClick: (e: React.MouseEvent<HTMLDivElement>, pageId: number) => void;
    handleOnChangePageName: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
    onAddingSubPage: (e: React.MouseEvent<HTMLButtonElement>, parentPageId: number) => void;
}

export const PageListElement = ({ page, onClick, handleOnChangePageName, onAddingSubPage }: props) => {

    const [isHover, setIsHover] = useState(false)

    const handleHoverChange = (isHover: boolean) => {
        setIsHover(isHover)
    }

    return (
        <div
            onMouseEnter={() => handleHoverChange(true)}
            onMouseLeave={() => handleHoverChange(false)}
        >
            <DefaultCard
                onClick={(e) => onClick(e, page.id)}
            >
                <input
                    onChange={(e) => handleOnChangePageName(e, page.id)}
                    value={page.name || 'New page'}
                />
                { isHover && (
                    <div>
                        <span>...</span>
                        <button
                            onClick={(e) => onAddingSubPage(e, page.id)}
                        >+</button>
                    </div>
                )}
            </DefaultCard>
        </div>
    )
}