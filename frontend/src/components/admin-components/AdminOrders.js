import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch Orders once on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/orders'); // Fetch all orders from backend
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Prepare data for DataGrid
  const rows = orders.map((order) => ({
    id: order._id, // Set unique ID for each order
    user: order.userId?.username || 'Unknown', // Use populated username
    totalAmount: order.totalAmount,
    paymentStatus: order.paymentStatus || 'Pending', // Provide a default value for paymentStatus
    items: order.items ? order.items.map((item) => `${item.productId?.name || 'Unknown'} (Quantity: ${item.quantity})`).join(', ') : 'No items', // Handle undefined items
    telephone: order.telephone, // Include telephone
    address: order.address, // Include address
  }));

  const columns = [
    { field: 'id', headerName: 'Order ID', width: 150 },
    { field: 'user', headerName: 'User', width: 200 },
    { field: 'items', headerName: 'Items', width: 400 },
    { field: 'totalAmount', headerName: 'Total Amount (Rs)', width: 150 },
    { field: 'paymentStatus', headerName: 'Payment Status', width: 150 },
    { field: 'telephone', headerName: 'Telephone', width: 150 }, // Column for telephone
    { field: 'address', headerName: 'Address', width: 250 }, // Column for address
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <h2>Order Details</h2>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        autoHeight
        getRowId={(row) => row.id} // Use id for unique row id
      />
    </Box>
  );
};

export default AdminOrders;
