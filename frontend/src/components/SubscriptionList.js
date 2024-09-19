// src/components/SubscriptionList.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SubscriptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const SubscriptionCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
`;

function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5005/api/subscriptions/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubscriptions(response.data);
      } catch (error) {
        console.error('Failed to fetch subscriptions:', error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div>
      <h2>My Subscriptions</h2>
      <SubscriptionGrid>
        {subscriptions.map((subscription) => (
          <SubscriptionCard key={subscription._id}>
            <h3>{subscription.product.name}</h3>
            <p>Frequency: {subscription.frequency}</p>
            <p>Quantity: {subscription.quantity}</p>
            <p>Start Date: {new Date(subscription.startDate).toLocaleDateString()}</p>
            {/* Add options to modify or cancel subscription */}
          </SubscriptionCard>
        ))}
      </SubscriptionGrid>
    </div>
  );
}

export default SubscriptionList;