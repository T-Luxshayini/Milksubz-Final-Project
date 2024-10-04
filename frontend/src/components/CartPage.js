import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Wrapper for the whole cart page with background image and centered content
const CartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${require('../images/milk.jpg')});
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
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

// Styling for the total amount
const TotalAmount = styled.div`
  text-align: right;
  font-size: 18px;
  margin-top: 20px;
  font-weight: bold;
`;

function CartPage() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate('/order', { state: { item } });
  };

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
    const paymentLink = "https://sandbox.payhere.lk/pay/o753126ca"; // Use the sandbox payment link
    window.open(paymentLink, "_blank"); // Open the payment link in a new tab or window
  };

  // const handleCheckout = () => {
  //   const totalAmount = calculateTotal();
  //   // Pass the entire cart to the payment page
  //   navigate('/payment', { state: { cart, totalAmount } });
  // };

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
              <CartItem key={index} onClick={() => handleItemClick(item)}>
                <img src={item.imageUrl} alt={item.name} width="60" />
                <CartDetails>
                  <CartItemName>{item.name}</CartItemName>
                  <p>{item.description}</p>
                </CartDetails>
                <CartQuantity>
                  <QuantityButton onClick={() => handleQuantityChange(item, -1)}>-</QuantityButton>
                  <span>{item.quantity || 1}</span>
                  <QuantityButton onClick={() => handleQuantityChange(item, 1)}>+</QuantityButton>
                </CartQuantity>
                <CartPrice>Rs {item.price}</CartPrice>
                <DeleteButton onClick={(e) => { e.stopPropagation(); handleDeleteItem(item); }}>
                  <FontAwesomeIcon icon={faTrashAlt} color="red" />
                </DeleteButton>
              </CartItem>
            ))}
            <TotalAmount>Total: Rs {calculateTotal()}</TotalAmount> {/* Display total amount */}
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
