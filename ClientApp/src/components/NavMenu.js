import {  useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import Logout from './Account/Logout';
import { Roles } from './Account/Roles';

export default function NavMenu({ setAuthentication, authentication }) {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  const employeePageLinks = () => {
    return (
      <>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to="/transactions">Transactions</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to="/employee">Employee Details</NavLink>
        </NavItem>
      </>
    );
  }

  const adminPageLinks = () => {
    return (
      <>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to="/packages">Packages</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to="/transactions">Transactions</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to="/employee">Employee Details</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} className="text-dark" to="/admin">Admin Dashboard</NavLink>
        </NavItem>
      </>
    );
  }

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
        <NavbarBrand tag={Link} to="/">PostOffice</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
          <ul className="navbar-nav flex-grow align-items-center">
            <NavItem>
              <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
            </NavItem>
            { authentication.role === Roles[1] && adminPageLinks() }
            { authentication.role === Roles[2] && employeePageLinks() }
            <NavItem>
            <Logout size="sm" setAuthentication={setAuthentication} />
            </NavItem>
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
}
