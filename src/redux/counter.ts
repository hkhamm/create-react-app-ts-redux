import { Action, Dispatch } from 'redux'

export const INCREMENT_REQUESTED = 'INCREMENT_REQUESTED'
export const INCREMENT = 'INCREMENT'
export const DECREMENT_REQUESTED = 'DECREMENT_REQUESTED'
export const DECREMENT = 'DECREMENT'
export const SET_NAME = 'SET_NAME'

export interface ICounterState {
    count: number
    isIncrementing: boolean
    isDecrementing: boolean
    name: string
}

interface IAction extends Action {
    result: any
}

const initialState = {
    count: 0,
    isIncrementing: false,
    isDecrementing: false,
    name: ''
}

export default (state: ICounterState = initialState, action: IAction) => {
    switch (action.type) {
        case INCREMENT_REQUESTED:
        return {
            ...state,
            isIncrementing: true
        }
        case INCREMENT:
        return {
            ...state,
            count: state.count + 1,
            isIncrementing: !state.isIncrementing
        }
        case DECREMENT_REQUESTED:
        return {
            ...state,
            isDecrementing: true
        }
        case DECREMENT:
        return {
            ...state,
            count: state.count - 1,
            isDecrementing: !state.isDecrementing
        }
        case SET_NAME:
        return {
            ...state,
            name: action.result
        }
        default:
            return state
    }
}

export const increment = () => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: INCREMENT_REQUESTED
        })

        dispatch({
            type: INCREMENT
        })
    }
}

export const incrementAsync = () => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: INCREMENT_REQUESTED
        })

        return setTimeout(() => {
            dispatch({
                type: INCREMENT
            })
        }, 3000)
    }
}

export const decrement = () => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: DECREMENT_REQUESTED
        })

        dispatch({
            type: DECREMENT
        })
    }
}

export const decrementAsync = () => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: DECREMENT_REQUESTED
        })

        return setTimeout(() => {
        dispatch({
            type: DECREMENT
        })
        }, 3000)
    }
}

export const setName = (name: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: SET_NAME,
            result: name
        })
    }
}
