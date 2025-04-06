export const reorderingArrayForDragDrop = (originalArray: unknown[], fromIndex: number, toIndex: number, draggedCountElements: number = 1) => {

    if(fromIndex >= originalArray.length) return null

    const draggedElements = originalArray.splice(fromIndex, draggedCountElements)
    const beforeInsertingSection = originalArray.splice(0, toIndex)
    const reOrderedArray = [...beforeInsertingSection, ...draggedElements, ...originalArray]
    
    return reOrderedArray
}