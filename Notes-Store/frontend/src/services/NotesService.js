import axios from "axios";

export default class NotesService {
    static fetchNotes() {
        return axios.get('/api/notes/')
    }

    static sendNote(note, csrf) {
        return axios.post('/api/notes/', {
            'body': note.body,
            'priority': note.priority,
            'header': note.header
        }, { headers: { 'X-CSRFToken': csrf } })
    }

    static fetchNotesCount() {
        return axios.get('/api/notes/?count_only=true')
    }

    static deleteNote(note, csrf) {
        return axios.delete('/api/notes/' + note.id + '/', { headers: { 'X-CSRFToken': csrf } })
    }
}