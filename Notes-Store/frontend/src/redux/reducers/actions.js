import AuthService from '../../services/AuthService'
import { SET_IS_FORM_UPLOADING, SET_INIT, SET_CSRF, SET_ERROR } from './appReducer/actionTypes'
import { SET_IS_AUTH } from './authReducer/actionsTypes'
import Cookies from 'universal-cookie'
import TranslationService from '../../services/TranslationService'

const setIsAuth = (isAuthenticated) => {
    return {
        type: SET_IS_AUTH,
        payload: isAuthenticated
    }
}

const handleError = (error, dispatch) => {
    const ts = new TranslationService()
    if (error.response.data['error'])
        dispatch(setError(ts.translate(error.response.data['error'])))
    else {
        let errorMessage = ''
        for (const key in error.response.data) {
            errorMessage += ts.translate(key) + ': '
            for (const message of error.response.data[key]) {
                errorMessage += ts.translate(message)
            }
            errorMessage += '\n'
            
        }
        dispatch(setError(errorMessage))
    }
}

export const checkIsAuthenticated = () => {
    return (dispatch) => {
        dispatch(setIniting(true))
        AuthService.checkIsAuthenticated().then((response) => {
            dispatch(setIniting(false))
            dispatch(setIsAuth(response.data.isAuthenticated))
        }).catch((error) => {
            handleError(error, dispatch)
        })
    }
}

export const login = (email, password, csrf) => {
    return (dispatch) => {
        dispatch(setIsFormUploading(true))
        AuthService.login(email, password, csrf).then((_) => {
            dispatch(setCSRF(''))
            dispatch(setIsFormUploading(false))
            dispatch(setIsAuth(true))
            dispatch(setError(''))
        }).catch((error) => {
            dispatch(setIsFormUploading(false))
            handleError(error, dispatch)
        })
    }
}

export const register = (email, password, csrf) => {
    return (dispatch) => {
        dispatch(setIsFormUploading(true))
        AuthService.register(email, password, csrf).then((_) => {
            dispatch(setIsFormUploading(false))
            dispatch(setError(''))
        }).catch((error) => {
            dispatch(setIsFormUploading(false))
            handleError(error, dispatch)
        })
    }
}

export const fetchCSRF = () => {
    return (dispatch) => {
        AuthService.getCSRF().then((response) => {
            if (response.status == 204) {
                const cookies = new Cookies()
                const csrf = cookies.get('csrftoken')
                dispatch(setCSRF(csrf))
            }
        }).catch((error) => {
            handleError(error, dispatch)
        })
    }
}

export const setIniting = (isIniting) => {
    return { type: SET_INIT, payload: isIniting }
}

export const setError = (error) => {
    return { type: SET_ERROR, payload: error }
}

export const setIsFormUploading = (isFormUploading) => {
    return { type: SET_IS_FORM_UPLOADING, payload: isFormUploading }
}

export const setCSRF = (csrf) => {
    return { type: SET_CSRF, payload: csrf }
}