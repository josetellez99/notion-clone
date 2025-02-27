import { ReactNode } from "react"
import styles from './DefaultCard.module.css'

interface props {
    children: ReactNode;
    showHover?: boolean;
    onHover?: () => void;
    hoverColor?: string;
    className?: string;
}

export const DefaultCard = ({children} : props) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}