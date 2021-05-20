import React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom'

class Header extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" fixed="top" >
                <Link to="/" className="navbar-brand">
                    <img
                        src={'assets/images/logo/teamA.jpeg'}
                        width="90"
                        height="40"
                        className="d-inline-block align-top"
                        alt="CanSat"
                    />
                </Link>
                <Nav className="mr-auto">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/mission" className="nav-link">Mission</Link>
                    <Nav.Link href="/reactWebApp/model">Model</Nav.Link>
                    <NavDropdown title="Subsystems" id="collasible-nav-dropdown">
                        <Link to="/electricalcomp" className="dropdown-item">Electrical Component</Link>
                        <Link to="/carrierview" className="dropdown-item">Carrier Subsystem Design</Link>
                        <Link to="/payloadview" className="dropdown-item">Science Payload design</Link>
                    </NavDropdown>
                    <Link to="/members" className="nav-link">Team Members</Link>
                </Nav>
            </Navbar>
        );
    }
}
export default Header;