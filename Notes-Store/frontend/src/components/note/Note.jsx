import { useMemo } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useTransition } from '../../hooks/useTransition'
import { requestDeleteNote } from '../../redux/reducers/actions'
import DateTimeService from '../../services/DateTimeService'
import classes from './Note.module.css'

const Note = ({ note, width, csrf, height, deleteNote }) => {

    const onClickDelete = () => {
        makeTransition(classes.fading, classes.hidden, '', 400, () => { deleteNote(note, csrf) })
    }

    const getPriorityBarClasses = () => {
        let result = classes.priorityBar + ' '
        if (note.priority < 4) {
            result += classes.greenBar
        } else if (note.priority < 8) {
            result += classes.yellowBar
        } else {
            result += classes.redBar
        }
        return result
    }

    const dateTime = useMemo(() => DateTimeService.format(note.date), [note.date])
    const [transitionClasses, isMakingTransition, makeTransition] = useTransition(classes.active)

    return (
        <Card className={transitionClasses}>
            <div className={getPriorityBarClasses()}></div>
            <Card.Body  style={{ width: width, height: height }}>
                <div className='h-75' style={{ overflow: 'hidden', display: 'block' }}>
                    <Card.Title>{note.header}</Card.Title>
                    <Card.Text className='h-75 p-2'>
                        {note.body}
                    </Card.Text>
                </div>
                <div className='h-25 d-flex justify-content-between'>
                    {!isMakingTransition ?
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
                    <div className={'d-flex align-items-end flex-row ' + classes.date}>
                        {dateTime}
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

const mapStateToProps = (state, ownProps) => {
    const csrf = state.app.csrf
    return { csrf, ...ownProps }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteNote: (note, csrf) => dispatch(requestDeleteNote(note, csrf))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)