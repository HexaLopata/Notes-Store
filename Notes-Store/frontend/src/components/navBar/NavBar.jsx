import { connect } from 'react-redux';
import { privateRoutes, publicRoutes } from '../../global/routes'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Container, Nav } from 'react-bootstrap'

const NavBar = ({ isAuthenticated }) => {

    const getButtons = (routes) => {
        return routes.map((route) => {
            return (
                <LinkContainer to={route.path} key={route.path}>
                    <Nav.Link to={route.path}>{route.name}</Nav.Link>
                </LinkContainer>
            )
        })
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
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { isAuthenticated } = state.auth
    return { isAuthenticated, ...ownProps }
}

export default connect(mapStateToProps)(NavBar)