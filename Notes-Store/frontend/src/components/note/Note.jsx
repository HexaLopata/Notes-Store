import { Card, Spinner } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { requestDeleteNote } from '../../redux/reducers/actions'

const Note = ({ note, width, csrf, isFormUploading, height, deleteNote }) => {

    const onClickDelete = () => {
        deleteNote(note, csrf)
    }

    return (
        <Card>
            <Card.Body style={{ width: width, height: height }}>
                <div className='h-75'>
                    <Card.Title>{note.header}</Card.Title>
                    <Card.Text className='h-75' style={{ overflow: 'hidden', display: 'block' }}>
                        {note.body}
                    </Card.Text>
                </div>
                <div className='h-25'>
                    {!isFormUploading ?
                        <Button
                            style={{ height: '50px' }}
                            variant='danger'
                            onClick={onClickDelete}
                        >
                            Удалить
                        </Button>
                        :
                        <Spinner animation="border" variant="danger" />
                    }
                </div>
            </Card.Body>
        </Card>
    )
}

const mapStateToProps = (state, ownProps) => {
    const csrf = state.app.csrf
    const isFormUploading = state.app.isFormUploading
    return { csrf, isFormUploading, ...ownProps }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteNote: (note, csrf) => dispatch(requestDeleteNote(note, csrf))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)