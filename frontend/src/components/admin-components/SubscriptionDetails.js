import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';

const AdminDashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5005/api/subscriptions/admin/stripe-subscriptions')
      .then((response) => {
        setSubscriptions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subscriptions from Stripe:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDisableSubscription = (subscriptionId) => {
    // Call the backend to disable the subscription
    axios.put(`http://localhost:5005/api/subscriptions/disable/${subscriptionId}`)
      .then((response) => {
        console.log('Subscription disabled:', response.data);
        // After disabling, update the state to reflect the change
        setSubscriptions(prevSubscriptions =>
          prevSubscriptions.map(sub =>
            sub.id === subscriptionId ? { ...sub, status: 'disabled' } : sub
          )
        );
      })
      .catch((error) => {
        console.error('Error disabling subscription:', error);
      });
  };

  const columns = [
    { field: 'id', headerName: 'Subscription ID', width: 200 },
    { field: 'customerId', headerName: 'Customer ID', width: 200 },
    // { field: 'customerName', headerName: 'Customer Name', width: 150 },
    { field: 'customerEmail', headerName: 'Email', width: 200 },
    // { field: 'customerAddress', headerName: 'Address', width: 250 },
    // { field: 'customerPhone', headerName: 'Phone', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'currentPeriodEnd', headerName: 'Period End', width: 200 },
    {
      field: 'items',
      headerName: 'Items',
      width: 300,
      renderCell: (params) => {
        return params.row.items.map((item, index) => (
          <div key={index}>
            {item.product} - {item.amount} {item.currency} / {item.interval}
          </div>
        ));
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Button
          color="error"
          variant="contained"
          onClick={() => handleDisableSubscription(params.row.id)}
        >
          Disable
        </Button>
      ),
    }
  ];
  

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={subscriptions}
        columns={columns}
        getRowId={(row) => row.id}  // Assuming `id` is the unique identifier for each subscription
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        loading={loading}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default AdminDashboard;
