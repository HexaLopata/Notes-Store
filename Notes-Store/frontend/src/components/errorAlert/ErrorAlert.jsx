import { connect } from 'react-redux'
import { hideError } from '../../redux/reducers/actions'
import SmartAlert from '../smartAlert/SmartAlert'

const ErrorAlert = ({ error, lifeTime = 5000, hideError }) => {
    return (
        <SmartAlert 
            message={error}
            variant='danger'
            hideAlert={hideError} 
            lifeTime={lifeTime}   
        />
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