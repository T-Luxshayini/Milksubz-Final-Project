// // ContactMessages.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid';
// import { Box } from '@mui/material';
// import moment from 'moment';
// const ContactMessages = ({ open, onClose }) => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5005/api/contact', {
//       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//     })
//       .then((response) => {
//         setMessages(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching contact messages:', error);
//       });
//   }, []); // Run only on mount
  

//   const columns = [
//     { field: '_id', headerName: 'ID', width: 100 },
//     { field: 'name', headerName: 'Name', width: 150 },
//     { field: 'email', headerName: 'Email', width: 200 },
//     { field: 'message', headerName: 'Message', width: 400 },
//     { 
//       field: 'createdAt', 
//       headerName: 'Date', 
//       width: 200,
//       renderCell: (params) => {
//         // Check if we have a valid date string
//         if (!params.row.createdAt) return 'No date';
        
//         // Use moment to parse and format the date
//         return moment(params.row.createdAt).format('MM/DD/YYYY HH:mm A');
//       }
//     }
//   ];
//   return (
//     <Box sx={{ height: 500, width: '100%' }}>
//       <DataGrid
//         rows={messages}
//         columns={columns}
//         getRowId={(row) => row._id}
//         pageSize={5}
//         rowsPerPageOptions={[5, 10]}
//       />
//     </Box>
//   );
// };

// export default ContactMessages;

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

  // Replace with your actual EmailJS public key, service ID, and template ID
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5005/api/contact')
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
      to_email: selectedMessage.email,   // recipient's email
      reply_message: replyMessage,       // message content
      user_name: selectedMessage.name,   // sender's name
    };
  
    try {
      // First, send the reply via EmailJS to the user's email
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams, EMAILJS_PUBLIC_KEY);
      console.log('Reply sent via EmailJS');
  
      // Optionally, you can update the messages state to reflect the sent reply
  
      // Then, send the reply details to your backend API to log/store the reply
      const backendResponse = await axios.post('http://localhost:5005/api/contact/reply', emailParams);
  
      if (backendResponse.data.success) {
        // Successfully sent the reply and saved it to the backend
        setReplyDialogOpen(false);        // Close the dialog
        setReplyMessage('');              // Clear the message input
  
        // Optionally, update your messages state to reflect the sent reply
        // setMessages([...messages, backendResponse.data.newMessage]);
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
      }
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
        />
      ]
    }
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={messages}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        loading={loading}
        disableSelectionOnClick
      />

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
