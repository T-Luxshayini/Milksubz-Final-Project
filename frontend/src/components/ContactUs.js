import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Box, Button, Container, Paper, TextField, Typography, Snackbar, Alert } from '@mui/material';
import vectorImage from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/5124556.jpg';
import axios from 'axios';
export const ContactUs = () => {
  const form = useRef();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_p9sy49m', 'template_8set0kq', form.current, 'IVJKCR1xxKLEeg7m5')
      .then(
        () => {
          axios.post('http://localhost:5005/api/contact', {
            name: form.current.from_name.value,
            email: form.current.from_email.value,
            message: form.current.message.value,
          })
          .then(() => {
            setOpenSnackbar(true); // Show success message
            form.current.reset(); // Clear the form fields
          })
          .catch((error) => {
            console.error('Failed to save message to the backend:', error);
            alert("Message sent but failed to save in the database.");
          });
        },
        (error) => {
          console.error('Failed to send email:', error);
          alert("Failed to send message, please try again.");
        }
      );
  };


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container sx={{ py: 8 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 4,
          textAlign: 'center',
          color: '#16325B',
          fontWeight: 'bold',
        }}
      >
        Contact Us
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: '#fff',
          color: '#0D7C66',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src={vectorImage}
          alt="Contact Us Illustration"
          sx={{
            width: { xs: '100%', md: '50%' },
            maxHeight: '400px',
            objectFit: 'contain',
            marginRight: { md: 3 },
            mb: { xs: 3, md: 0 },
            // color:'#16325B'
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 2 ,color:'#16325B'}}>
            Get in Touch
          </Typography>
          <form ref={form} onSubmit={sendEmail}>
            <TextField
              fullWidth
              name="from_name"
              label="Your Name"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              name="from_email"
              label="Your Email"
              type="email"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              name="message"
              label="Your Message"
              variant="outlined"
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: '#FFDC7F',
                color: '#16325B',
                padding: '10px 20px',
                fontWeight: 'bold',
                borderRadius: '50px'
              }}
            >
              Send Message
            </Button>
          </form>
        </Box>
      </Paper>

      {/* Snackbar for success notification */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactUs;
