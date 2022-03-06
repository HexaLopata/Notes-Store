import { connect } from 'react-redux'
import { hideMessage } from '../../redux/reducers/actions'
import SmartAlert from '../smartAlert/SmartAlert'

const InfoAlert = ({ message, lifeTime = 5000, hideMessage }) => {
    return (
        <SmartAlert
            message={message}
            variant='success'
            hideAlert={hideMessage}
            lifeTime={lifeTime}
        />
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