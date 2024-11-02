// frontend/src/components/OrderDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders once on component mount
  useEffect(() => {
    axios.get('http://localhost:5005/api/orders')
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
    // {
    //   field: 'createdAt',
    //   headerName: 'Date',
    //   width: 200,
    //   valueGetter: (params) => {
    //     const date = params.row.createdAt;
    //     return date ? new Date(date).toLocaleDateString() : 'N/A';
    //   },
    // },
  ];

  return (
    <Box sx={{ height: 500, width: '100%', padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center" color="success">Order Details</Typography>
      <DataGrid
        rows={orders}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default OrderDetails;
