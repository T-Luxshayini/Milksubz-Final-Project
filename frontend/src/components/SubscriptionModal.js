import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import SubscriptionForm from './SubscriptionForm';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const SubscriptionModal = ({ open, onClose }) => {
  const [isFormOpen, setFormOpen] = useState(false);

  const handleStartNow = () => {
    setFormOpen(true);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        {!isFormOpen ? (
          <>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Subscription Plan Features
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Get fresh dairy products delivered to your doorstep.
            </Typography>
            <Button variant="contained" onClick={handleStartNow} fullWidth>
              Start Now
            </Button>
          </>
        ) : (
          <SubscriptionForm onClose={onClose} />
        )}
      </Box>
    </Modal>
  );
};

export default SubscriptionModal;
