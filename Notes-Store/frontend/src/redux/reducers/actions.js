import AuthService from '../../services/AuthService'
import { SET_IS_FORM_UPLOADING, SET_INIT, SET_CSRF, HIDE_ERROR, SHOW_ERROR, SHOW_MESSAGE, HIDE_MESSAGE } from './appReducer/actionTypes'
import { SET_IS_AUTH } from './authReducer/actionTypes'
import { ADD_NOTES, DELETE_NOTE, SET_NOTES } from './noteReducer/actionTypes'
import Cookies from 'universal-cookie'
import TranslationService from '../../services/TranslationService'
import NotesService from '../../services/NotesService'

const handleError = (error, dispatch) => {
    const ts = new TranslationService()
    if (!error.response || error.response.status === 500) {
        dispatch(showError('Ошибка сервера'))
    } else if (error.response.data['error']) {
        dispatch(showError(ts.translate(error.response.data['error'])))
    } else if (error.response.data['detail']) {
        dispatch(showError(ts.translate(error.response.data['detail'])))
    } else {
        let errorMessage = ''
        for (const key in error.response.data) {
            errorMessage += ts.translate(key) + ': '
            for (const message of error.response.data[key]) {
                errorMessage += ts.translate(message)
            }
            errorMessage += '\n'
        }
        dispatch(showError(errorMessage))
    }

}

export const checkIsAuthenticated = () => {
    return (dispatch) => {
        dispatch(setIniting(true))
        AuthService.checkIsAuthenticated().then((response) => {
            dispatch(setIsAuth(response.data.isAuthenticated))
        }).catch((error) => {
            handleError(error, dispatch)
        }).finally(() => {
            dispatch(setIniting(false))
        })
    }
}

export const login = (email, password, csrf) => {
    return (dispatch) => {
        dispatch(setIsFormUploading(true))
        AuthService.login(email, password, csrf).then((_) => {
            dispatch(setCSRF(''))
            dispatch(setIsAuth(true))
        }).catch((error) => {
            handleError(error, dispatch)
        }).finally(() => {
            dispatch(setIsFormUploading(false))
        })
    }
}

export const logout = (csrf) => {
    return (dispatch) => {
        dispatch(setIsFormUploading(true))
        AuthService.logout(csrf).then((_) => {
            dispatch(setIsAuth(false))
            dispatch(setCSRF(''))
        }).catch((error) => {
            handleError(error, dispatch)
        }).finally(() => {
            dispatch(setIsFormUploading(false))
        })
    }
}

export const register = (email, password, csrf) => {
    return (dispatch) => {
        dispatch(setIsFormUploading(true))
        AuthService.register(email, password, csrf).then((_) => {
            dispatch(showMessage('Регистрация прошла успешно'))
        }).catch((error) => {
            handleError(error, dispatch)
        }).finally(() => {
            dispatch(setIsFormUploading(false))
        })
    }
}

export const fetchNotes = () => {
    return (dispatch) => {
        NotesService.fetchNotes().then((response) => {
            dispatch(setNotes(response.data))
        }).catch((error) => {
            handleError(error, dispatch)
        })
    }
}

export const sendNote = (note, csrf) => {
    return (dispatch) => {
        dispatch(setIsFormUploading(true))
        NotesService.sendNote(note, csrf).then((response) => {
            dispatch(addNote(response.data))
            dispatch(showMessage('Заметка успешно добавлена'))
        }).catch((error) => {
            handleError(error, dispatch)
        }).finally(() => {
            dispatch(setIsFormUploading(false))
        })
    }
}

export const requestDeleteNote = (note, csrf) => {
    return (dispatch) => {
        dispatch(setIsFormUploading(true))
        NotesService.deleteNote(note, csrf).then((response) => {
            dispatch(deleteNote(note))
            dispatch(showMessage('Заметка успешно удалена'))
        }).catch((error) => {
            handleError(error, dispatch)
        }).finally(() => {
            dispatch(setIsFormUploading(false))
        })
    }
}


export const fetchCSRF = () => {
    return (dispatch) => {
        AuthService.getCSRF().then((response) => {
            const cookies = new Cookies()
            const csrf = cookies.get('csrftoken')
            dispatch(setCSRF(csrf))
        }).catch((error) => {
            handleError(error, dispatch)
        })
    }
}

const setIsAuth = (isAuthenticated) => {
    return { type: SET_IS_AUTH, payload: isAuthenticated }
}

export const setIniting = (isIniting) => {
    return { type: SET_INIT, payload: isIniting }
}

export const showError = (error) => {
    return { type: SHOW_ERROR, payload: error }
}

export const hideError = () => {
    return { type: HIDE_ERROR }
}

export const showMessage = (message) => {
    return { type: SHOW_MESSAGE, payload: message }
}

export const hideMessage = () => {
    return { type: HIDE_MESSAGE }
}

export const setIsFormUploading = (isFormUploading) => {
    return { type: SET_IS_FORM_UPLOADING, payload: isFormUploading }
}

export const setCSRF = (csrf) => {
    return { type: SET_CSRF, payload: csrf }
}

export const setNotes = (notes) => {
    return { type: SET_NOTES, payload: notes }
}

export const addNote = (note) => {
    return { type: ADD_NOTES, payload: [note] }
}

export const deleteNote = (note) => {
    return { type: DELETE_NOTE, payload: note }
}