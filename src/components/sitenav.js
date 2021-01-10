import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

class SiteNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar bg="light" expand="lg" class="navbar navbar-default navbar-static-top">
                <Navbar.Brand href="/">Internal Wiki</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                        <Nav.Link href="/register">SignUp</Nav.Link>
                        <Nav.Link href="/signin">SignIn</Nav.Link>
                        <Nav.Link href="/" onClick={(e) => Auth.signOut()} >SignOut</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default SiteNav;