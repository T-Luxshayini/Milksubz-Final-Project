import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// Wrapper for the whole cart page with background image and centered content
const CartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${require('/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/assets/images/vecteezy_ai-generated-dairy-variety-on-wooden-backdrop_40555158.jpg')});
  background-size: cover;
  background-position: center;
  padding: 20px;
`;

// Expanding the size of the cart container
const CartContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
`;

// Header styling
const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: #16325B;
  font-weight:bold;
`;

// Styling for individual cart items
const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
  cursor: pointer;
`;

// Styling for cart details
const CartDetails = styled.div`
  flex-grow: 1;
  margin-left: 10px;
`;

// Styling for the cart item name
const CartItemName = styled.h3`
  margin: 0;
  color: #16325B;
`;

// Quantity button wrapper
const CartQuantity = styled.div`
  display: flex;
  align-items: center;
`;

// Button for increasing or decreasing quantity
const QuantityButton = styled.button`
  background-color: #ddd;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

// Price styling
const CartPrice = styled.p`
  margin-left: 10px;
`;

// Delete button styling
const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 10px;
`;

// Proceed to Checkout button styling
const CheckoutButton = styled.button`
  background-color: #FFDC7F;
  color: #16325B;
  border: none;
  padding: 10px 15px;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 20px;
`;

// Styling for the total amount
const TotalAmount = styled.div`
  text-align: right;
  font-size: 18px;
  margin-top: 20px;
  font-weight: bold;
  color: #16325B;
`;

function CartPage() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    // Optionally, you can fetch the cart data from the backend if needed when the component mounts
  }, []);

  const handleDeleteItem = (itemToDelete) => {
    const updatedCart = cart.filter(item => item.name !== itemToDelete.name);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toFixed(2);
  };

  const handleQuantityChange = (item, increment) => {
    const updatedCart = cart.map(cartItem => {
      if (cartItem.name === item.name) {
        return { ...cartItem, quantity: Math.max(1, (cartItem.quantity || 1) + increment) }; // Prevent quantity from going below 1
      }
      return cartItem;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    try {
      const totalAmount = calculateTotal();
      // saveCartToBackend(); // Save cart before proceeding to checkout
      navigate('/payment', { state: { cart, totalAmount } });
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an issue proceeding to checkout. Please try again.');
    }
  };

  return (
    <CartWrapper>
      <CartContainer>
        <CartHeader>
          <h2>Your Cart</h2>
          <span>{cart.length} items</span>
        </CartHeader>

        {cart.length > 0 ? (
          <>
            {cart.map((item, index) => (
              <CartItem key={index}>
                {item.imageUrl && <img src={item.imageUrl} alt={item.name} width="60" />}
                <CartDetails>
                  <CartItemName>{item.name || 'Item'}</CartItemName>
                  <p>{item.description || 'No description available'}</p>
                </CartDetails>
                <CartQuantity>
                  <QuantityButton onClick={() => handleQuantityChange(item, -1)}>-</QuantityButton>
                  <span>{item.quantity || 1}</span>
                  <QuantityButton onClick={() => handleQuantityChange(item, 1)}>+</QuantityButton>
                </CartQuantity>
                <CartPrice>LKR {item.price || 0}</CartPrice>
                <DeleteButton onClick={(e) => { e.stopPropagation(); handleDeleteItem(item); }}>
                  <FontAwesomeIcon icon={faTrashAlt} color="red" />
                </DeleteButton>
              </CartItem>
            ))}
            <TotalAmount>Total: LKR {calculateTotal()}</TotalAmount> {/* Display total amount */}
            <CheckoutButton onClick={handleCheckout}>Proceed to Checkout</CheckoutButton>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
      </CartContainer>
    </CartWrapper>
  );
}

export default CartPage;
