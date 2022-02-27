import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import NavBar from './components/navBar/NavBar';
import { privateRoutes, publicRoutes } from './global/routes';
import { checkIsAuthenticated } from './redux/reducers/actions';
import './App.css';
import { Spinner } from 'react-bootstrap';
import CSRF from './components/csrf/CSRF';
import ErrorAlert from './components/errorAlert/ErrorAlert';
import MainPage from './pages/MainPage';

function App({ isAuthenticated, isIniting, checkIsAuthenticated }) {

  useEffect(() => {
    checkIsAuthenticated()
  }, [])

  const getRoutes = (routesList) => {
    return routesList.map((route) => {
      return (
        <Route path={route.path} element={route.page} key={route.path} />
      )
    })
  }

  return (
    <>
      {isIniting ?
        <div className='h-100 d-flex align-items-center justify-content-center'>
          <Spinner animation="border" variant="danger" />
        </div> 
        :
        <BrowserRouter>
          <CSRF/>
          <NavBar />
          <ErrorAlert/>
          <Routes>
            {isAuthenticated ? getRoutes(privateRoutes) : getRoutes(publicRoutes)}
            <Route path='*' element={<MainPage/>} />
          </Routes>
        </BrowserRouter>
      }
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const isAuthenticated = state.auth.isAuthenticated
  const isIniting = state.app.isIniting
  return { isAuthenticated, isIniting, ...ownProps }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkIsAuthenticated: () => dispatch(checkIsAuthenticated())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
