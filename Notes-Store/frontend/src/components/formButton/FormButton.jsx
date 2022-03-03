import { Button } from "react-bootstrap"
import { connect } from "react-redux"

const FormButton = ({ isFormUploading, children, ...props }) => {
    return (
        <Button { ...props } disabled={isFormUploading}>
            { children }
        </Button>
    )
}

const mapStateToProps = (state, ownProps) => {
    const isFormUploading = state.app.isFormUploading
    return { isFormUploading, ...ownProps }
}

export default connect(mapStateToProps)(FormButton)
