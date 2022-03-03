import { connect } from 'react-redux';
import { privateRoutes, publicRoutes } from '../../global/routes'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { logout } from '../../redux/reducers/actions';

const NavBar = ({ isAuthenticated, csrf, logout }) => {

    const getButtons = (routes) => {
        return routes.map((route) => {
            return (
                <LinkContainer to={route.path} key={route.path}>
                    <Nav.Link to={route.path}>{route.name}</Nav.Link>
                </LinkContainer>
            )
        })
    }

    const onExitClick = () => {
        logout(csrf)
    }

    return (
        <Navbar bg='light' expand='lg'>
            <Container fluid>
                <Navbar.Brand>Notes Store</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        {isAuthenticated ? getButtons(privateRoutes) : getButtons(publicRoutes)}
                    </Nav>
                    {isAuthenticated ? <Button onClick={onExitClick}>Выйти</Button> : <></>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { isAuthenticated } = state.auth
    const { csrf } = state.app
    return { isAuthenticated, csrf, ...ownProps }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (csrf) => dispatch(logout(csrf))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)