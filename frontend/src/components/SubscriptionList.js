import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SubscriptionPageWrapper = styled.div`
  padding: 50px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const SubscriptionPlan = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const Button = styled.button`
  background-color: #1e90ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff4500;
  }
`;

const Select = styled.select`
  padding: 8px;
  margin-right: 10px;
  border-radius: 5px;
`;

const Input = styled.input`
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 50px;
`;

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingSubscriptionId, setEditingSubscriptionId] = useState(null);
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const { data } = await axios.get('/api/subscriptions/my', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSubscriptions(data);
    };
    fetchSubscriptions();
  }, []);

  const handleEditClick = (id, currentFrequency, currentQuantity, currentStatus) => {
    setEditingSubscriptionId(id);
    setSelectedFrequency(currentFrequency);
    setQuantity(currentQuantity);
    setStatus(currentStatus);
  };

  const handleSubscriptionUpdate = async (id) => {
    try {
      await axios.put(`/api/subscriptions/${id}`, {
        frequency: selectedFrequency,
        quantity,
        status,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.map((subscription) =>
          subscription._id === id
            ? { ...subscription, frequency: selectedFrequency, quantity, status }
            : subscription
        )
      );
      setEditingSubscriptionId(null);
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  const handleSubscribe = async (productId, frequency) => {
    await axios.post('/api/subscriptions', { product: productId, frequency, quantity: 1, startDate: new Date() });
    const { data } = await axios.get('/api/subscriptions/my');
    setSubscriptions(data);
  };

  return (
    <SubscriptionPageWrapper>
      <Title>Subscription Plans</Title>
      {subscriptions.length === 0 ? (
        <p>No subscriptions yet. Subscribe to our products below!</p>
      ) : (
        subscriptions.map((subscription) => (
          <SubscriptionPlan key={subscription._id}>
            <h3>{subscription.product.name}</h3>
            {editingSubscriptionId === subscription._id ? (
              <>
                <Select value={selectedFrequency} onChange={(e) => setSelectedFrequency(e.target.value)}>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </Select>
                <Input
                  type="number"
                  value={quantity}
                  min="1"
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="cancelled">Cancelled</option>
                </Select>
                <Button onClick={() => handleSubscriptionUpdate(subscription._id)}>Save</Button>
              </>
            ) : (
              <>
                <p>Frequency: {subscription.frequency}</p>
                <p>Quantity: {subscription.quantity}</p>
                <p>Status: {subscription.status}</p>
                <Button onClick={() => handleEditClick(subscription._id, subscription.frequency, subscription.quantity, subscription.status)}>
                  Edit Subscription
                </Button>
              </>
            )}
          </SubscriptionPlan>
        ))
      )}

      <h2>Subscribe to Products</h2>
      <div>
        <h3>Fresh Milk - Rs 240</h3>
        <Button onClick={() => handleSubscribe('product-id-1', 'weekly')}>Subscribe Weekly</Button>
        <Button onClick={() => handleSubscribe('product-id-1', 'monthly')}>Subscribe Monthly</Button>
      </div>
    </SubscriptionPageWrapper>
  );
};

export default SubscriptionPage;
