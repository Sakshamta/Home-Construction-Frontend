import React, { Component } from 'react'
import {Navbar, Nav} from 'react-bootstrap';


class Header extends Component {
    render() {
        return (
            <div className="header">
                <Navbar variant="dark" >
                    <Navbar.Brand href="/home">HOME SWEET HOME</Navbar.Brand>
                    <Nav className="ml-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/add">Add</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default Header
