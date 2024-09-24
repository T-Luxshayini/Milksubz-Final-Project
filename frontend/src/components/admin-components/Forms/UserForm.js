import React, { useState } from 'react';
import UserDetails from '../UserDetails'; // Adjust the path based on your project structure
import { Button } from '@mui/material';

const Dashboard = () => {
  // State to control whether the UserDetails dialog is open
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

  // Function to open the dialog
  const handleOpen = () => {
    setIsUserDialogOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setIsUserDialogOpen(false);
  };

  return (
    <div>
      {/* Button to open the UserDetails dialog */}
      <Button onClick={handleOpen}>View Users</Button>

      {/* Pass the open state and handleClose to UserDetails */}
      <UserDetails open={isUserDialogOpen} onClose={handleClose} />
    </div>
  );
};

export default Dashboard;
