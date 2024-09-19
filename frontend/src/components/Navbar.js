// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #1e90ff;
  padding: 10px;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
`;

const NavItem = styled.li`
  display: inline;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1em;

  &:hover {
    text-decoration: underline;
  }
`;

function Navbar() {
  return (
    <Nav>
      <NavList>
        <NavItem><NavLink to="/">Home</NavLink></NavItem>
        <NavItem><NavLink to="/register">Register</NavLink></NavItem>
        <NavItem><NavLink to="/login">Login</NavLink></NavItem>
      </NavList>
    </Nav>
  );
}

export default Navbar;