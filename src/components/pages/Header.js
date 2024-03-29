import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../../logo.png';

export default function Header() {
    return (
        <Navbar variant='dark' collapseOnSelect expand="md">
            <Navbar.Brand>
                <img
                    alt=""
                    src={logo}
                    width="100"
                    height="30"
                    className="d-inline-block align-top"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="justify-content-end ml-auto">
                    <Nav.Link as={Link} to='/track'>Tracking App</Nav.Link>
                    <Nav.Link as={Link} to='/todo'>To Do App</Nav.Link>
                    <Nav.Link as={Link} to='/user'>User</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
