import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Alert,
  Box,
  CircularProgress
} from '@mui/material';

const Details = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    subscriptionPlan: '',
    deliveryDays: '',
    deliveryTime: '',
    quantity: 0
  });

  useEffect(() => {
    fetchSubscriptionDetails();
  }, []);

  const fetchSubscriptionDetails = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/subscriptions/admin/stripe-subscriptions');
      const data = await response.json();
      const latestSubscription = data[data.length - 1];
      setSubscription(latestSubscription);
      setUpdateFormData({
        subscriptionPlan: latestSubscription.subscriptionPlan,
        deliveryDays: latestSubscription.deliveryDays,
        deliveryTime: latestSubscription.deliveryTime,
        quantity: latestSubscription.quantity
      });
    } catch (err) {
      setError('Failed to fetch subscription details');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/subscriptions/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: subscription.subscriptionId })
      });

      if (response.ok) {
        setSubscription(prev => ({ ...prev, status: 'canceled' }));
      } else {
        throw new Error('Failed to cancel subscription');
      }
    } catch (err) {
      setError('Failed to cancel subscription');
      console.error('Error:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/subscriptions/update-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscriptionId: subscription.subscriptionId,
          ...updateFormData
        })
      });

      if (response.ok) {
        const updatedData = await response.json();
        setSubscription(prev => ({ ...prev, ...updateFormData }));
        setShowUpdateDialog(false);
      } else {
        throw new Error('Failed to update subscription');
      }
    } catch (err) {
      setError('Failed to update subscription');
      console.error('Error:', err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdateFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!subscription) {
    return <Typography align="center">No subscription found</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 1000, margin: 'auto', p: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Subscription Details
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">{subscription.email}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Status
              </Typography>
              <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                {subscription.status}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Plan
              </Typography>
              <Typography variant="body1">{subscription.subscriptionPlan}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Delivery Days
              </Typography>
              <Typography variant="body1">{subscription.deliveryDays}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Delivery Time
              </Typography>
              <Typography variant="body1">{subscription.deliveryTime}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Quantity
              </Typography>
              <Typography variant="body1">{subscription.quantity} liters</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Address
              </Typography>
              <Typography variant="body1">{subscription.address}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Phone
              </Typography>
              <Typography variant="body1">{subscription.phone}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Total Amount
              </Typography>
              <Typography variant="body1">Rs. {subscription.totalAmount}</Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setShowUpdateDialog(true)}
              disabled={subscription.status === 'canceled'}
            >
              Update Subscription
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleCancel}
              disabled={subscription.status === 'canceled'}
            >
              Cancel Subscription
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Dialog open={showUpdateDialog} onClose={() => setShowUpdateDialog(false)}>
        <DialogTitle>Update Subscription</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Subscription Plan</InputLabel>
              <Select
                name="subscriptionPlan"
                value={updateFormData.subscriptionPlan}
                onChange={handleChange}
                label="Subscription Plan"
              >
                <MenuItem value="1 week">1 Week</MenuItem>
                <MenuItem value="1 month">1 Month</MenuItem>
                <MenuItem value="3 months">3 Months</MenuItem>
                <MenuItem value="6 months">6 Months</MenuItem>
                <MenuItem value="1 year">1 Year</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Delivery Days</InputLabel>
              <Select
                name="deliveryDays"
                value={updateFormData.deliveryDays}
                onChange={handleChange}
                label="Delivery Days"
              >
                <MenuItem value="Weekdays">Weekdays</MenuItem>
                <MenuItem value="Weekend">Weekend</MenuItem>
                <MenuItem value="All Days">All Days</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Delivery Time</InputLabel>
              <Select
                name="deliveryTime"
                value={updateFormData.deliveryTime}
                onChange={handleChange}
                label="Delivery Time"
              >
                <MenuItem value="Morning">Morning</MenuItem>
                <MenuItem value="Evening">Evening</MenuItem>
                <MenuItem value="Night">Night</MenuItem>
              </Select>
            </FormControl>

            <TextField
              name="quantity"
              label="Quantity (liters)"
              type="number"
              value={updateFormData.quantity}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUpdateDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Details;