import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const OrderWrapper = styled.div`
  padding: 20px;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OrderDetails = styled.div`
  flex-grow: 1;
  margin-left: 10px;
`;

const QuantityButton = styled.button`
  background-color: #ddd;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
`;

function OrderPage() {
  const location = useLocation();
  const { item } = location.state || {};
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const navigate = useNavigate();

  const handleQuantityChange = (amount) => {
    if (quantity + amount > 0) {
      setQuantity(quantity + amount);
    }
  };

  const handleBuyNow = () => {
    // Navigate to payment page, passing the updated item and quantity
    navigate('/payment', { state: { item, quantity } });
  };

  if (!item) {
    return <div>No product selected</div>;
  }

  return (
    <OrderWrapper>
      <h2>Order Details</h2>
      <OrderItem>
        <img src={item.imageUrl} alt={item.name} width="60" />
        <OrderDetails>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>Price: Rs {item.price}</p>
          <div>
            <QuantityButton onClick={() => handleQuantityChange(-1)}>-</QuantityButton>
            <span>{quantity}</span>
            <QuantityButton onClick={() => handleQuantityChange(1)}>+</QuantityButton>
          </div>
        </OrderDetails>
      </OrderItem>
      <Button onClick={handleBuyNow}>Buy Now</Button>
    </OrderWrapper>
  );
}

export default OrderPage;
