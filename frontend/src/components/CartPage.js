import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CartWrapper = styled.div`
  padding: 20px;
`;

const CartItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
`;

function CartPage() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate('/payment');
  };

  return (
    <CartWrapper>
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        cart.map((item, index) => (
          <CartItem key={index}>
            <h3>{item.name}</h3>
            <p>Price: Rs{item.price}</p>
            <p>{item.description}</p>
          </CartItem>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
      {cart.length > 0 && <Button onClick={handleBuyNow}>Buy Now</Button>}
    </CartWrapper>
  );
}

export default CartPage;
