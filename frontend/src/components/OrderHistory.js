import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders`); // Adjust endpoint as needed
      setOrders(response.data);
    };

    fetchOrders();
  }, []);

  return (
    <Box>
      <Typography variant="h4">Order History</Typography>
      {orders.map(order => (
        <Box key={order.id} sx={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
          <Typography>Name: {order.name}</Typography>
          <Typography>Address: {order.address}</Typography>
          <Typography>Total: LKR {order.totalAmount / 100}</Typography>
          <Typography>Status: {order.status}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default OrderHistory;
