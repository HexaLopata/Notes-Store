import { useState } from "react"
import { Container, Form, FloatingLabel, Button } from "react-bootstrap"
import { connect } from "react-redux"
import { addNote, sendNote } from "../redux/reducers/actions"

const AddNotesPage = ({ csrf, sendNote }) => {
    const [priority, setPriority] = useState(0)
    const [body, setBody] = useState('')
    const [header, setHeader] = useState('')

    const submit = (e) => {
        e.preventDefault()
        const note = { body, priority: Math.ceil(priority * 0.1), header }
        sendNote(note, csrf)
    }

    return (
        <Container>
            <Form onSubmit={submit}>
                <h1 className='mt-4 text-center'>Добавить заметку</h1>
                <Form.Group className='mb-3'>
                    <Form.Label>Заголовок</Form.Label>
                    <Form.Control
                        type='text'
                        autoComplete='false'
                        placeholder='Введите заголовок'
                        value={header}
                        onChange={(e) => setHeader(e.target.value)}
                    />
                </Form.Group>

                <FloatingLabel controlId="floatingTextarea" label="Текст заметки" className="mb-3">
                    <Form.Control
                        as="textarea"
                        placeholder="Текст заметки"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        style={{ height: '150px' }}
                    />
                </FloatingLabel>
                <Form.Label htmlFor='priority'>Приоритет: {Math.ceil(priority / 10)}</Form.Label>
                <Form.Range
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    id='priority'
                >
                </Form.Range>
                <Button variant='primary' type='submit'>
                    Принять
                </Button>
            </Form>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => {
    const csrf = state.app.csrf
    return { csrf, ...ownProps }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendNote: (note, csrf) => dispatch(sendNote(note, csrf)),
        showMessage: (message) => dispatch(showMessage(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNotesPage)