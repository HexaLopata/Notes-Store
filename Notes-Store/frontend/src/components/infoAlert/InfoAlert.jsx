import { useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { hideMessage } from '../../redux/reducers/actions'

const InfoAlert = ({ message, lifeTime = 5000, hideMessage }) => {

    useEffect(() => {
        if (message.trim() !== '') {
            const timeout = setTimeout(() => {
                hideMessage()
            }, lifeTime)

            return () => {
                clearTimeout(timeout)
            }
        }
        
    }, [message])

    return (
        <>
            {message === '' ? <></> :
                <Alert variant='success'>
                    {message}
                </Alert>
            }
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    const message = state.app.message
    return { message, ...ownProps }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideMessage: () => dispatch(hideMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoAlert)