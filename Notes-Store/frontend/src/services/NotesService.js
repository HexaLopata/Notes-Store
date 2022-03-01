import axios from "axios";

export default class NotesService {
    static fetchNotes() {
        return axios.get('/api/note/')
    }

    static sendNote(note, csrf) {
        return axios.post('/api/note/', {
            'body': note.body,
            'priority': note.priority
        }, { headers: { 'X-CSRFToken': csrf } })
    }

    static deleteNote(note, csrf) {
        return axios.delete('/api/note/' + note.id + '/', { headers: { 'X-CSRFToken': csrf } })
    }
}