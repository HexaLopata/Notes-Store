import { useState } from 'react'
import { Form, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { login, showError } from '../redux/reducers/actions'
import FormButton from '../components/formButton/FormButton'

const LoginPage = ({ csrf, login, showError }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = (e) => {
        e.preventDefault()
        if (email.trim() && password.trim()) {
            login(email, password, csrf)
        } else {
            showError('Поля не должны быть пустыми')
        }
    }

    return (
        <div className='mt-4'>
            <Container>
                <h1>Логин</h1>
                <Form onSubmit={submit}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Электронная почта</Form.Label>
                        <Form.Control
                            type='email'
                            autoComplete='false'
                            placeholder='Введите email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Пароль'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <FormButton variant='primary' type='submit'>
                        Принять
                    </FormButton>
                </Form>
            </Container>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { csrf } = state.app
    return { csrf, ...ownProps }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password, csrf) => dispatch(login(email, password, csrf)),
        showError: (error) => dispatch(showError(error))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)