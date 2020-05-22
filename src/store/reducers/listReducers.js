import { CONSTANT } from '../action-types'
import { uuid } from 'uuidv4'
const initialState = {
    trello: [
        { title: 'todo', cards: [], id: uuid() },
        { title: 'done', cards: [], id: uuid() }
    ],
    loading: false,
    error: null
}
const listReducers = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANT.ADD_LIST:
            const newList = {
                title: action.payload,
                cards: [],
                id: uuid(),
            }
            return {
                ...state,
                trello: [...state.trello, newList]
            }

        case CONSTANT.ADD_CARD:
            const newTodoItem = {
                text: action.payload.text,
                id: uuid(),
                createdDate: Date.now(),
                title: action.payload.title
            }
            const newState = state.trello.map(list => {
                if (list.id === action.payload.listId) {
                    return {
                        ...list,
                        cards: [...list.cards, newTodoItem]
                    }
                } else { return list }
            })
            return {
                ...state,
                trello: newState
            };


        case CONSTANT.REMOVE_CARD:
            const { id, listID } = action.payload;
            const removeItem = state.trello.map(
                list => list.id === listID
                    ? { ...list, cards: list.cards.filter(card => card.id !== id) }
                    : list,
            );
            return {
                ...state,
                trello: removeItem
            };

        case CONSTANT.UPDATE_CARD:
            const { uCardID, uListID, title, text } = action.payload;
            const updatedList = state.trello.map(
                list => {
                    if (list.id === uListID) {
                        return {
                            ...list, cards: list.cards.map(card => {
                                if (card.id === uCardID) {
                                    return {
                                        ...card,
                                        title: title,
                                        text: text,
                                        updatedDate: Date.now()
                                    }
                                }
                                else {
                                    return card;
                                }
                            })
                        }
                    } else {
                        return list;
                    }
                }
            )
            return { ...state, trello: updatedList };

        case CONSTANT.DRAG_CARD:
            const { cardDragID, listDragID, targetLisId } = action.payload;
            let myCard = null;
            state.trello.forEach(list => {
                list.cards.forEach(card => {
                    if (card.id === cardDragID) {
                        myCard = card;
                    }
                })
            })
            const clearedList = state.trello.map(
                list => list.id === listDragID
                    ? { ...list, cards: list.cards.filter(card => card.id !== myCard.id) }
                    : list,
            );
            const allState = clearedList.map(list => {
                if (list.id === targetLisId) {
                    return {
                        ...list,
                        cards: [...list.cards, myCard]
                    }
                } else { return list }
            });
            return { ...state, trello: allState };
        case CONSTANT.FETCH_TODOS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case CONSTANT.FETCH_TODOS_SUCCESS:

            const todos = action.payload
            let todo = todos.filter(todo => todo.completed === false)
            todo = todo.map(item => {
                return {
                    id: uuid(),
                    title: item.title,
                    createdDate: Date.now(),
                    text: 'no description'
                }
            })

            let done = todos.filter(todo => todo.completed === true)
            done = done.map(item => {
                return {
                    id: uuid(),
                    title: item.title,
                    createdDate: Date.now(),
                    text: 'no description'
                }
            })


            let intitialList = state.trello.map(list => {
                if (list.title === 'todo') {
                    return {
                        ...list,
                        cards: [...list.cards, ...todo]
                    }
                }
                if (list.title === 'done') {
                    return {
                        ...list,
                        cards: [...list.cards, ...done]
                    }
                }
                return {...list}
            })
            return {
                ...state,
                trello: intitialList,
                loading: false,
            }
        case CONSTANT.FETCH_TODOS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,

            };

        default:
            return state
    }

}
export default listReducers