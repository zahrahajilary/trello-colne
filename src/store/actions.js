import { CONSTANT } from './action-types'
export const addList = (title) => {
    return ({
        type: CONSTANT.ADD_LIST,
        payload: title,
    })
}

export const addCard = (text, title, listId) => {
    return ({
        type: CONSTANT.ADD_CARD,
        payload: { text, title, listId }
    })
}

export const removeCard = (id, listID) => {
    return ({
        type: CONSTANT.REMOVE_CARD,
        payload: { id, listID }
    })
}

export const updateItem = (uCardID, uListID, title, text) => {
    return ({
        type: CONSTANT.UPDATE_CARD,
        payload: { uCardID, uListID, title, text }
    })
}

export const dragDropCard = (cardDragID, listDragID, targetLisId) => {
    return ({
        type: CONSTANT.DRAG_CARD,
        payload: { cardDragID, listDragID, targetLisId }
    })
}
