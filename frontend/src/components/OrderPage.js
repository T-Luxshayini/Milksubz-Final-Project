import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const OrderWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center; /* Center the card */
  background-color: #f8f9fa; /* Light background for contrast */
`;

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
  padding: 20px;
  width: 300px; /* Set a fixed width for the card */
  margin: 10px;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px; /* Spacing between order items */
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
  border-radius: 4px; /* Rounded corners */
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #ccc; /* Darken on hover */
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%; /* Full width button */
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0056b3; /* Darken on hover */
  }
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
      <Card>
        {/* <h2>Order Details</h2> */}
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
      </Card>
    </OrderWrapper>
  );
}

export default OrderPage;
