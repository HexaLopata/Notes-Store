import { SET_IS_AUTH } from './actionsTypes'

const defaultState = {
    isAuthenticated: false,
}

export const authReducer = (state = defaultState, action) => {
    switch(action.type) {
        case SET_IS_AUTH:
            return { ...state, isAuthenticated: action.payload }
        default:
            return state
    }
}

