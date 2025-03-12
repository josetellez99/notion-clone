import React, { CSSProperties, ReactNode } from "react"
import styles from './DefaultCard.module.css'

interface props {
    children: ReactNode;
    showHover?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>, pageId?: number) => void
    onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
    hoverColor?: string;
    style?: CSSProperties
}

export const DefaultCard = ({children, onClick, onMouseEnter, style} : props) => {

    return (
        <div 
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            className={styles.container}
            style={style}
        >
            {children}
        </div>
    )
}