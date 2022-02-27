import { Alert } from "react-bootstrap"
import { connect } from "react-redux"

const ErrorAlert = ({ error }) => {
    return (
        <>
            {error === "" ? <></> :
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

export default connect(mapStateToProps)(ErrorAlert)