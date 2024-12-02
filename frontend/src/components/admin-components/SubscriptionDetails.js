// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
// import { Box, Button } from '@mui/material';

// const AdminDashboard = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     axios.get('http://localhost:5005/api/subscriptions/admin/stripe-subscriptions')
//       .then((response) => {
//         setSubscriptions(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching subscriptions from Stripe:', error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   const handleDisableSubscription = (subscriptionId) => {
//     // Call the backend to disable the subscription
//     axios.put(`http://localhost:5005/api/subscriptions/disable/${subscriptionId}`)
//       .then((response) => {
//         console.log('Subscription disabled:', response.data);
//         // After disabling, update the state to reflect the change
//         setSubscriptions(prevSubscriptions =>
//           prevSubscriptions.map(sub =>
//             sub.id === subscriptionId ? { ...sub, status: 'disabled' } : sub
//           )
//         );
//       })
//       .catch((error) => {
//         console.error('Error disabling subscription:', error);
//       });
//   };

//   const columns = [
//     { field: 'id', headerName: 'Subscription ID', width: 200 },
//     { field: 'customerId', headerName: 'Customer ID', width: 200 },
//     // { field: 'customerName', headerName: 'Customer Name', width: 150 },
//     { field: 'customerEmail', headerName: 'Email', width: 200 },
//     // { field: 'customerAddress', headerName: 'Address', width: 250 },
//     // { field: 'customerPhone', headerName: 'Phone', width: 150 },
//     { field: 'status', headerName: 'Status', width: 150 },
//     { field: 'currentPeriodEnd', headerName: 'Period End', width: 200 },
//     {
//       field: 'items',
//       headerName: 'Items',
//       width: 300,
//       renderCell: (params) => {
//         return params.row.items.map((item, index) => (
//           <div key={index}>
//             {item.product} - {item.amount} {item.currency} / {item.interval}
//           </div>
//         ));
//       }
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 200,
//       renderCell: (params) => (
//         <Button
//           color="error"
//           variant="contained"
//           onClick={() => handleDisableSubscription(params.row.id)}
//         >
//           Disable
//         </Button>
//       ),
//     }
//   ];
  

//   return (
//     <Box sx={{ height: 500, width: '100%' }}>
//       <DataGrid
//         rows={subscriptions}
//         columns={columns}
//         getRowId={(row) => row.id}  // Assuming `id` is the unique identifier for each subscription
//         pageSize={5}
//         rowsPerPageOptions={[5, 10]}
//         loading={loading}
//         disableSelectionOnClick
//       />
//     </Box>
//   );
// };

// export default AdminDashboard;


// frontend/src/components/SubscriptionDetails.js
// backend/routes/subscriptions.js
// const express = require('express');
// const router = express.Router();

// router.get('/api/subscriptions', async (req, res) => {
//   try {
//     const db = await connectToDatabase();
//     const subscriptionsCollection = db.collection('subscriptions');
    
//     const subscriptions = await subscriptionsCollection.find({}).toArray();
//     res.status(200).json(subscriptions);
//   } catch (error) {
//     console.error('Error fetching subscriptions:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;

// frontend/src/components/SubscriptionDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { 
  Box, 
  Typography, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar 
} from '@mui/material';

const SubscriptionDetails = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const fetchSubscriptions = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/subscriptions/admin/stripe-subscriptions`)
      .then((response) => {
        const transformedData = response.data.map((subscription, index) => ({
          ...subscription,
          id: subscription._id || `generated-id-${index}`,
          email: subscription.email || 'N/A',
          customerId: subscription.customerId || 'N/A',
          subscriptionPlan: subscription.subscriptionPlan || 'N/A',
          totalAmount: subscription.totalAmount || 0,
          deliveryDays: subscription.deliveryDays || 'N/A',
          deliveryTime: subscription.deliveryTime || 'N/A',
          address: subscription.address || 'N/A',
          phone: subscription.phone || 'N/A',
          quantity: subscription.quantity || 0,
          createdAt: subscription.createdAt ? new Date(subscription.createdAt).toLocaleString() : 'N/A',
          status: subscription.status || 'N/A',
          currentPeriodEnd: subscription.currentPeriodEnd ? new Date(subscription.currentPeriodEnd).toLocaleString() : 'N/A'
        }));
        setSubscriptions(transformedData);
      })
      .catch((error) => {
        console.error('Error fetching subscriptions:', error);
        showSnackbar('Error fetching subscriptions', 'error');
      });
  };

  // useEffect(() => {
  //   fetchSubscriptions();
  // }, []);

  const handleCancelClick = (subscription) => {
    setSelectedSubscription(subscription);
    setOpenDialog(true);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCancelConfirm = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/subscriptions/cancel-subscription`, {
        subscriptionId: selectedSubscription.subscriptionId
      });

      if (response.status === 200) {
        // Update the local state to reflect the cancellation
        setSubscriptions(prevSubscriptions =>
          prevSubscriptions.map(sub =>
            sub.id === selectedSubscription.id
              ? { ...sub, status: 'canceled' }
              : sub
          )
        );
        showSnackbar('Subscription cancelled successfully');
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      showSnackbar('Failed to cancel subscription', 'error');
    }
    setOpenDialog(false);
  };

  const columns = [
    { field: 'id', headerName: 'Subscription ID', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'customerId', headerName: 'Customer ID', width: 150 },
    { field: 'subscriptionPlan', headerName: 'Plan', width: 150 },
    { field: 'totalAmount', headerName: 'Amount', width: 120 },
    { field: 'deliveryDays', headerName: 'Delivery Days', width: 150 },
    { field: 'deliveryTime', headerName: 'Delivery Time', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'currentPeriodEnd', headerName: 'Period End', width: 200 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => {
        const isDisabled = params.row.status === 'canceled';
        return (
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleCancelClick(params.row)}
            disabled={isDisabled}
          >
            {isDisabled ? 'Cancelled' : 'Cancel'}
          </Button>
        );
      }
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Subscription Details
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={subscriptions}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.id}
          disableSelectionOnClick
        />
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          Are you sure you want to cancel this subscription?
          {selectedSubscription && (
            <Box sx={{ mt: 2 }}>
              <Typography>Email: {selectedSubscription.email}</Typography>
              <Typography>Plan: {selectedSubscription.subscriptionPlan}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>No, Keep It</Button>
          <Button onClick={handleCancelConfirm} color="error" variant="contained">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SubscriptionDetails;