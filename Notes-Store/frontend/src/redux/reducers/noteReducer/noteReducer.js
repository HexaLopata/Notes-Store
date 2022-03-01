import { ADD_NOTES, DELETE_NOTE, SET_NOTES } from "./actionTypes"


const defaultState = {
    notes: []
}

export const noteReducer = (state = defaultState, action) => {
    switch(action.type) {
        case SET_NOTES:
            return { ...state, notes: action.payload }
        case ADD_NOTES:
            return { ...state, notes: state.notes.concat(action.payload) }
        case DELETE_NOTE:
            return { ...state, notes: state.notes.filter((note) => note.id != action.payload.id ) }
        default:
            return state
    }
}

