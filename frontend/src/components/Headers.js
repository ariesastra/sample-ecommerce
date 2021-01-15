import React from 'react'

// DEPENDENCIES
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {Route} from 'react-router-dom'

// Component
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'

// Style
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'


const Headers = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            Shopyey <i className="fas fa-handshake"></i>
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* 
                        CREATE SEARCH BOX METHOD 
                        using Route from react router DOM & history as a Props
                        */}
                        <Route render={({history}) => <SearchBox history={history}/>} />
                        
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link>
                                     <i className="fas fa-shopping-cart"></i> Cart
                                </Nav.Link>
                            </LinkContainer>
                            {
                                userInfo 
                                ? (
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                )
                                :   <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <i className="fas fa-user"></i> Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                            }
                            {
                                userInfo && userInfo.isAdmin && (
                                    <NavDropdown title='Admin' id='adminMenu'>
                                        <LinkContainer to="/admin/userlist">
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/productlist">
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to="/admin/orderlist">
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                    </NavDropdown>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Headers
