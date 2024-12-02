// frontend/src/components/OrderDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders once on component mount
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/orders`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const columns = [
    { field: '_id', headerName: 'Order ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'totalAmount', headerName: 'Total Amount (LKR)', width: 150 },
    { field: 'telephone', headerName: 'Phone Number', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'paymentId', headerName: 'Payment ID', width: 200 },
    { field: 'paymentStatus', headerName: 'Payment Status', width: 150 },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
      {/* Header section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="div">Order Details</Typography>
      </Box>
      {/* DataGrid section */}
      <Box
        sx={{
          height: 500,
          width: '100%',
          maxWidth: '1000px',
          border: '2px solid #16325b', // Custom border color
          borderRadius: '8px', // Optional: Add rounded corners
          transform: 'scale(1.2)', // Apply zoom
          transformOrigin: 'center', // Adjust scaling origin
        }}
      >
        <DataGrid
          rows={orders}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default OrderDetails;
