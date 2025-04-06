import React, { ReactNode, useState, ReactElement, cloneElement } from 'react'

interface props {
    onReOrder: (fromIndex: number, toIndex: number) => void;
    children: ReactNode;
}

export const DragAndDrogProvider = ({ onReOrder, children }: props) => {
    const [fromIndex, setFromIndex] = useState<number | null>(null)
    const [toIndex, setToIndex] = useState<number | null>(null)
    const [isDragging, setIsDragging] = useState(false)

    const onMouseDown = (e: any) => {
        // e.persist()
        // console.log(e)
        const index = Number(e.currentTarget.dataset.index)
        setFromIndex(index)
        setIsDragging(true)
    }

    const onMouseUp = (e: any) => {
        const index = Number(e.currentTarget.dataset.index)
        setToIndex(index)
        setIsDragging(false)
        if (fromIndex !== null && index !== null && fromIndex !== index) {
            onReOrder(fromIndex, index)
        }
    }

    const onMouseEnter = (e: any) => {
        if(!isDragging) return
        const index = Number(e.currentTarget.dataset.index)
        setToIndex(index)
    }

    const elements = React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child

        const element = cloneElement(child as ReactElement, {
            'data-index': index,
            onMouseDown,
            onMouseUp,
            onMouseEnter,
        })
        return element
    })

    return (
        <>
            {elements}
        </>
    )
}
