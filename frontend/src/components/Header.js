

// src/components/Header.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: #f8f8f8;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5em;
  color: #333;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo to="/">Fresh Dairy Delights</Logo>
      <Nav>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/subscriptions">My Subscriptions</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;