import { SET_INIT, SET_IS_FORM_UPLOADING, SET_CSRF, SET_ERROR } from "./actionTypes"

const defaultState = {
    isIniting: true,
    isFormUploading: false,
    csrf: '',
    error: ''
}

export const appReducer = (state = defaultState, action) => {
    switch(action.type) {
        case SET_INIT:
            return { ...state, isIniting: action.payload}
        case SET_IS_FORM_UPLOADING:
            return { ...state, isFormUploading: action.payload }
        case SET_CSRF:
            return { ...state, csrf: action.payload }
        case SET_ERROR:
            return { ...state, error: action.payload }
        default:
            return state
    }
}

