import { useEffect } from "react"
import { Button, Container } from "react-bootstrap"
import { connect } from "react-redux"
import Note from "../components/note/Note"
import { fetchNotes } from "../redux/reducers/actions"

const NotesPage = ({ notes, fetchNotes }) => {

    useEffect(() => {
        fetchNotes()
    }, [])

    return (
        <Container>
            <h1 className='mt-4 text-center'>Ваши заметки</h1>
            <div className='d-flex flex-wrap justify-content-center mt-4'>
                {notes.map((note) => {
                    return (
                        <div className='p-1'>
                            <Note width={'250px'} height={'250px'} note={note} key={note.id} />
                        </div>
                    )
                })}
            </div>
        </Container>
    )
}


const mapStateToProps = (state, ownProps) => {
    const notes = state.notes.notes
    return { notes, ...ownProps }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotes: () => dispatch(fetchNotes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesPage)