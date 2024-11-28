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
    <Container sx={{ py: 8, maxWidth: '90%' }}>
      <Typography
        variant="h3"
        component="h2"
        sx={{
          mb: 4,
          textAlign: 'center',
          color: '#16325B',
          fontWeight: 'bold',
          fontSize: '2.5rem', // Increased font size
        }}
      >
        ContactUs
      </Typography>
      <Paper
        elevation={5}
        sx={{
          padding: 6,
          maxWidth: '100%',
          margin: '0 auto',
          backgroundColor: '#fff',
          color: '#0D7C66',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: 4, // Added gap for better spacing
        }}
      >
        <Box
          component="img"
          src={vectorImage}
          alt="Contact Us Illustration"
          sx={{
            width: { xs: '100%', md: '50%' },
            maxHeight: '900px', // Increased max height
            objectFit: 'contain',
            marginRight: { md: 4 },
            mb: { xs: 3, md: 0 },
          }}
        />
        <Box sx={{ flex: 1, width: '100%' }}>
          <Typography variant="h5" sx={{ mb: 3, color: '#16325B', fontSize: '1.5rem' }}>
            Get in Touch
          </Typography>
          <form ref={form} onSubmit={sendEmail}>
            <TextField
              fullWidth
              name="from_name"
              label="Your Name"
              variant="outlined"
              sx={{ mb: 3 }}
              inputProps={{ style: { fontSize: '1.1rem', padding: '12px' } }} // Increased font size
            />
            <TextField
              fullWidth
              name="from_email"
              label="Your Email"
              type="email"
              variant="outlined"
              sx={{ mb: 3 }}
              inputProps={{ style: { fontSize: '1.1rem', padding: '12px' } }} // Increased font size
            />
            <TextField
              fullWidth
              name="message"
              label="Your Message"
              variant="outlined"
              multiline
              rows={6} // Increased rows for bigger text box
              sx={{ mb: 3 }}
              inputProps={{ style: { fontSize: '1.1rem', padding: '12px' } }} // Increased font size
            />
            <Button
  variant="contained"
  type="submit"
  sx={{
    backgroundColor: '#FFDC7F',
    color: '#16325B',
    padding: '8px 16px', // Reduced padding
    fontWeight: 'bold',
    fontSize: '1rem', // Reduced font size
    borderRadius: '50px',
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
