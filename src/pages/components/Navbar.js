import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './Logout-Button';
import withAuth from '../../hoc/withAuth';
import {
  Collapse,
  Navbar as RSNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
} from 'reactstrap';

const Navbar = (props) => {
  const { isAdmin } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <RSNavbar color="dark" dark expand="md">
        <NavbarBrand>
          <Link className="navbar-brand" to="/">
            🏠Signal House🏠
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </NavItem>
            {isAdmin === 1 && (
              <NavItem>
                <Link className="nav-link" to="/admin/add-signals">
                  Add Sinais
                </Link>
              </NavItem>
            )}
          </Nav>
          <NavbarText>
            <LogoutButton />
          </NavbarText>
        </Collapse>
      </RSNavbar>
    </div>
  );
};

export default withAuth(Navbar);
