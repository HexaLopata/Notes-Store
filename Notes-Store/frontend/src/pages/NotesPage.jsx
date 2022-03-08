import { useEffect } from "react"
import { Container } from "react-bootstrap"
import { connect } from "react-redux"
import NotesList from "../components/notesList/NotesList"
import { fetchNotes } from "../redux/reducers/actions"

const NotesPage = ({ fetchNotes }) => {

    useEffect(() => {
        fetchNotes()
    }, [])

    return (
        <Container>
            <NotesList/>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotes: () => dispatch(fetchNotes())
    }
}

export default connect(null, mapDispatchToProps)(NotesPage)