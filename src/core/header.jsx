import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'

class Header extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" fixed="top" collapseOnSelect expand="md" >
                <Link to="/" className="navbar-brand">
                    <img
                        src={'assets/images/logo/rocket.png'}
                        width="50"
                        height="44"
                        className="d-inline-block align-top"
                        alt="CanSat"
                    />
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" data-toggle="collapse"  data-target=".navbar-collapse collapse"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link to="/" eventKey="1" as={Link} className="nav-link">Home</Nav.Link>
                        <Nav.Link to="/mission" eventKey="2" as={Link} className="nav-link">Mission</Nav.Link>
                        <Nav.Link href="/mockCansat/model">Model</Nav.Link>
                        <NavDropdown title="Subsystems" id="collasible-nav-dropdown">
                            <Nav.Link to="/electricalcomp" as={Link} eventKey="3" className="dropdown-item">Electrical Component</Nav.Link>
                            <Nav.Link to="/carrierview" as={Link} eventKey="4" className="dropdown-item">Carrier Subsystem Design</Nav.Link>
                            <Nav.Link to="/payloadview" as={Link} eventKey="5" className="dropdown-item">Science Payload design</Nav.Link>
                        </NavDropdown>
                        <Nav.Link to="/members" eventKey="6" as={Link} className="nav-link">Team Members</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default Header;