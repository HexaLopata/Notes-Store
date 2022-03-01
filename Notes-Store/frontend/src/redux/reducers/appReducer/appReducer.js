import { SET_INIT, SET_IS_FORM_UPLOADING, SET_CSRF, SHOW_ERROR, HIDE_ERROR, SHOW_MESSAGE, HIDE_MESSAGE } from "./actionTypes"

const defaultState = {
    isIniting: true,
    isFormUploading: false,
    csrf: '',
    error: '',
    message: ''
}

export const appReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_INIT:
            return { ...state, isIniting: action.payload }
        case SET_IS_FORM_UPLOADING:
            return { ...state, isFormUploading: action.payload }
        case SET_CSRF:
            return { ...state, csrf: action.payload }
        case SHOW_ERROR:
            return { ...state, error: action.payload }
        case HIDE_ERROR:
            return { ...state, error: '' }
        case SHOW_MESSAGE:
            return { ...state, message: action.payload }
        case HIDE_MESSAGE:
            return { ...state, message: '' }
        default:
            return state
    }
}

