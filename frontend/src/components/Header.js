// src/components/Header.js
import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaShoppingCart, FaMoneyCheckAlt } from 'react-icons/fa'; // Import icons
import { RiLoginBoxLine, RiLogoutBoxLine } from 'react-icons/ri'; // For login/logout icons

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
  display: flex;
  align-items: center; // Align text and icon vertically
  gap: 5px; // Space between icon and text

  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center; // Align icon with text
  gap: 5px; // Space between icon and text

  &:hover {
    background-color: #ff4500;
  }
`;

function Header() {
  const navigate = useNavigate();

  // Logout function to remove token and navigate to login page
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/login'); // Redirect to the login page
  };

  const isLoggedIn = localStorage.getItem('token'); // Check if the user is logged in

  return (
    <HeaderContainer>
      <Logo to="/">MilkSubz</Logo>
      <Nav>
        <NavLink to="/">
          <FaHome /> Home
        </NavLink>
        <NavLink to="/products">
          <FaBoxOpen /> Products
        </NavLink>
        <NavLink to="/cart">
          <FaShoppingCart /> Cart
        </NavLink>
        <NavLink to="/payment-history">
          <FaMoneyCheckAlt /> Payment
        </NavLink>
        {!isLoggedIn ? (
          <>
            <NavLink to="/login">
              <RiLoginBoxLine /> Login
            </NavLink>
            <NavLink to="/register">
              <RiLoginBoxLine /> Register
            </NavLink>
          </>
        ) : (
          <LogoutButton onClick={handleLogout}>
            <RiLogoutBoxLine /> Logout
          </LogoutButton>
        )}
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
