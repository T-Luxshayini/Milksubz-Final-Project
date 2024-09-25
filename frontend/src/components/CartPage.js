import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Wrapper for the whole cart page with background image and centered content
const CartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${require('/home/uki-jaffna/Documents/Finalproject/Milksubz-Final-Project/frontend/src/images/milk.jpg')}); /* Ensure you give the correct relative path */
  background-size: cover;
  background-position: center;
  padding: 20px;
`;

// Expanding the size of the cart container
const CartContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px; /* Expanded the width of the cart */
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

// Buy Now button styling
const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

function CartPage() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate('/order', { state: { item } }); // Navigate to the order page with the item details
  };

  return (
    <CartWrapper>
      <CartContainer>
        <CartHeader>
          <h2>Your Cart</h2>
          <span>{cart.length} items</span>
        </CartHeader>

        {cart.length > 0 ? (
          cart.map((item, index) => (
            <CartItem key={index} onClick={() => handleItemClick(item)}>
              <img src={item.imageUrl} alt={item.name} width="60" />
              <CartDetails>
                <CartItemName>{item.name}</CartItemName>
                <p>{item.description}</p>
              </CartDetails>
              <CartQuantity>
                <QuantityButton>-</QuantityButton>
                <span>{item.quantity || 1}</span>
                <QuantityButton>+</QuantityButton>
              </CartQuantity>
              <CartPrice>Rs {item.price}</CartPrice>
            </CartItem>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}

        {cart.length > 0 && <Button onClick={() => navigate('/order')}>Proceed to Checkout</Button>}
      </CartContainer>
    </CartWrapper>
  );
}

export default CartPage;
