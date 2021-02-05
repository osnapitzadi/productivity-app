import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <Navbar>
            <Navbar.Brand>Productivity App</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link><Link exact to='/'>Home</Link></Nav.Link>
                <Nav.Link><Link to='/todo'>To Do App</Link></Nav.Link>
                <Nav.Link><Link to='/user'>User</Link></Nav.Link>
            </Nav>
        </Navbar>
    )
}
