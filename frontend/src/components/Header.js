import React, { useState, useEffect } from 'react'; // Import useState and useEffect
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

const CartIconWrapper = styled.div`
  position: relative; // Positioning for the cart count badge
`;

const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8em;
`;

function Header() {
  const [cartCount, setCartCount] = useState(0); // State for cart count
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart from local storage and set the count
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.length);
  }, []);

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
        <CartIconWrapper>
          <NavLink to="/cart">
            <FaShoppingCart />
            {cartCount > 0 && <CartCount>{cartCount}</CartCount>} {/* Display cart count */}
          </NavLink>
        </CartIconWrapper>
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
