import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Box, Select, MenuItem, TextField } from '@mui/material';

const SubscriptionDetails = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [editingSubscriptionId, setEditingSubscriptionId] = useState(null);
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('');

  // Fetch subscriptions once on mount
  useEffect(() => {
    axios.get('http://localhost:5005/api/subscriptions/my', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => {
        setSubscriptions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subscriptions:', error);
      });
  }, []);

  // Handle edit icon click
  const handleEditClick = (id, currentFrequency, currentQuantity, currentStatus) => {
    setEditingSubscriptionId(id);
    setSelectedFrequency(currentFrequency);
    setQuantity(currentQuantity);
    setStatus(currentStatus);
  };

  // Handle subscription update (frequency, quantity, status)
  const handleSubscriptionUpdate = async (id) => {
    try {
      // Send request to update subscription details in MongoDB
      await axios.put(`http://localhost:5005/api/subscriptions/${id}`, {
        frequency: selectedFrequency,
        quantity,
        status,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      // Update subscription in state and exit edit mode
      setSubscriptions((prevSubscriptions) => 
        prevSubscriptions.map((subscription) => 
          subscription._id === id ? { ...subscription, frequency: selectedFrequency, quantity, status } : subscription
        )
      );
      setEditingSubscriptionId(null); // Close the edit mode after saving
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 100 }, // Subscription ID column
    { field: 'product', headerName: 'Product', width: 150, valueGetter: (params) => params.row.product.name }, // Product name
    { field: 'frequency', headerName: 'Frequency', width: 150, renderCell: (params) => {
      if (editingSubscriptionId === params.row._id) {
        return (
          <Select
            value={selectedFrequency}
            onChange={(event) => setSelectedFrequency(event.target.value)}
            onBlur={() => handleSubscriptionUpdate(params.row._id)} // Update frequency when selection is complete
          >
            <MenuItem value="daily">daily</MenuItem>
            <MenuItem value="weekly">weekly</MenuItem>
            <MenuItem value="monthly">monthly</MenuItem>
          </Select>
        );
      }
      return (
        <>
          {params.row.frequency}
          <IconButton
            onClick={() => handleEditClick(params.row._id, params.row.frequency, params.row.quantity, params.row.status)} 
            size="small"
            style={{ marginLeft: 10 }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </>
      );
    }},
    { field: 'quantity', headerName: 'Quantity', width: 150, renderCell: (params) => {
      if (editingSubscriptionId === params.row._id) {
        return (
          <TextField
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            onBlur={() => handleSubscriptionUpdate(params.row._id)}
            inputProps={{ min: 1 }}
          />
        );
      }
      return params.row.quantity;
    }},
    { field: 'status', headerName: 'Status', width: 150, renderCell: (params) => {
      if (editingSubscriptionId === params.row._id) {
        return (
          <Select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            onBlur={() => handleSubscriptionUpdate(params.row._id)}
          >
            <MenuItem value="active">active</MenuItem>
            <MenuItem value="paused">paused</MenuItem>
            <MenuItem value="cancelled">cancelled</MenuItem>
          </Select>
        );
      }
      return params.row.status;
    }},
    { field: 'startDate', headerName: 'Start Date', width: 200, valueGetter: (params) => new Date(params.row.startDate).toLocaleDateString() }, // Format date
    { field: 'endDate', headerName: 'End Date', width: 200, valueGetter: (params) => params.row.endDate ? new Date(params.row.endDate).toLocaleDateString() : 'N/A' }, // Format date or show 'N/A'
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={subscriptions}
        columns={columns}
        getRowId={(row) => row._id} // Use _id for unique row id
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
      />
    </Box>
  );
};

export default SubscriptionDetails;
