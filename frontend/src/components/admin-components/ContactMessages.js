import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import emailjs from 'emailjs-com';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/api/contact`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching contact messages:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleReplyButtonClick = (params) => {
    setSelectedMessage(params.row);
    setReplyDialogOpen(true);
  };

  const handleReplySubmit = async () => {
    const emailParams = {
      to_email: selectedMessage.email,
      reply_message: replyMessage,
      user_name: selectedMessage.name,
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams, EMAILJS_PUBLIC_KEY);
      console.log('Reply sent via EmailJS');

      const backendResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/contact/reply`, emailParams);

      if (backendResponse.data.success) {
        setReplyDialogOpen(false);
        setReplyMessage('');
      } else {
        console.error('Error saving reply to backend');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'message', headerName: 'Message', width: 400 },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 200,
      renderCell: (params) => {
        if (!params.row.createdAt) return 'No date';
        return new Date(params.row.createdAt).toLocaleString();
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<SendIcon size={20} />}
          label="Reply"
          onClick={() => handleReplyButtonClick(params)}
        />,
      ],
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        gap: 2, // Add spacing between the elements
      }}
    >
      <Box
        sx={{
          height: 500,
          width: '80%',
          maxWidth: '1000px',
           // Custom border color
          borderRadius: '8px', // Optional rounded corners
          transform: 'scale(1.2)', // Apply zoom effect
          transformOrigin: 'center', // Center the zoom
          padding: 2,
        }}
      >
        <DataGrid
          rows={messages}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          loading={loading}
          disableSelectionOnClick
        />
      </Box>

      <Dialog open={replyDialogOpen} onClose={() => setReplyDialogOpen(false)}>
        <DialogTitle>Reply to Message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Reply Message"
            type="text"
            fullWidth
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReplyDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleReplySubmit} variant="contained" endIcon={<SendIcon />}>
            Send Reply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactMessages;
