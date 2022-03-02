import { useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { hideError } from '../../redux/reducers/actions'

const ErrorAlert = ({ error, lifeTime = 5000, hideError }) => {

    useEffect(() => {
        if (error.trim() !== '') {
            const timeout = setTimeout(() => {
                hideError()
            }, lifeTime)

            return () => {
                clearTimeout(timeout)
            }
        }
    }, [error])

    return (
        <>
            {error === '' ? <></> :
                <Alert variant='danger'>
                    {error}
                </Alert>
            }
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    const error = state.app.error
    return { error, ...ownProps }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideError: () => dispatch(hideError()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorAlert)