import React, { useState } from 'react';
import {
  TextField,
  Box,
  Typography,
  MenuItem,
  Select,
  Button,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Container
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import StripeCheckout from 'react-stripe-checkout';
import calculateTotal from '../components/calculateTotal';

const SubscriptionForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    selectedDates: [],
    subscriptionPlan: '1 week',
    quantity: 1,
    deliveryDays: 'Weekdays',
    deliveryTime: 'Morning',
  });

  const handleDateChange = (newDate) => {
    setFormData((prev) => ({
      ...prev,
      selectedDates: [...prev.selectedDates, newDate],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStripePayment = async (token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/create-subscription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Subscription successful! 🎉');
        onClose();
      } else {
        alert(`Error: ${data.error}`);
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred during payment.');
    }
  };

  const totalAmount = calculateTotal(formData);

  return (
    <Container maxWidth="md" sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      py: 4,
    }}>
      <Paper elevation={3} sx={{
        width: '100%',
        maxWidth: '600px', // Increased width
        p: 4,
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(22, 50, 91, 0.7), rgba(120, 183, 208, 0.7))',
        backdropFilter: 'blur(10px)',
        color: '#fff',
      }}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            mb: 3,
            fontWeight: 'bold',
            color: '#fff',
          }}
        >
          Create Your Milk Subscription
        </Typography>

        <Grid container spacing={2}>
          {/* Personal Information Column */}
          <Grid item xs={12} md={6}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
            }}>
              <TextField
                label="Name"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                size="small"
                inputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#DFF6FF' } }}
              />
              <TextField
                label="Address"
                fullWidth
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
                size="small"
                inputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#DFF6FF' } }}
              />
              <TextField
                label="Email"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                size="small"
                inputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#DFF6FF' } }}
              />
              <TextField
                label="Phone"
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                size="small"
                inputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#DFF6FF' } }}
              />
            </Box>
          </Grid>

          {/* Subscription Details Column */}
          <Grid item xs={12} md={6}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
            }}>
              <DatePicker
                label="Select Dates"
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    fullWidth: true,
                    size: 'small',
                    inputProps: { style: { color: '#fff' } },
                    InputLabelProps: { style: { color: '#DFF6FF' } },
                  }
                }}
              />
              <Typography variant="body2" sx={{ mb: 1, color: '#DFF6FF' }}>
                Selected Dates: {formData.selectedDates.join(', ')}
              </Typography>

              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel style={{ color: '#DFF6FF' }}>Subscription Plan</InputLabel>
                <Select
                  name="subscriptionPlan"
                  value={formData.subscriptionPlan}
                  onChange={handleChange}
                  label="Subscription Plan"
                  size="small"
                  inputProps={{ style: { color: '#fff' } }}
                >
                  <MenuItem value="1 week" style={{ color: '#fff' }}>1 Week</MenuItem>
                  <MenuItem value="1 month" style={{ color: '#fff' }}>1 Month</MenuItem>
                  <MenuItem value="3 months" style={{ color: '#fff' }}>3 Months</MenuItem>
                  <MenuItem value="6 months" style={{ color: '#fff' }}>6 Months</MenuItem>
                  <MenuItem value="1 year" style={{ color: '#fff' }}>1 Year</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Quantity (liters per day)"
                fullWidth
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                variant="outlined"
                size="small"
                inputProps={{ style: { color: '#fff' } }}
                InputLabelProps={{ style: { color: '#DFF6FF' } }}
              />

              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel style={{ color: '#DFF6FF' }}>Delivery Days</InputLabel>
                <Select
                  name="deliveryDays"
                  value={formData.deliveryDays}
                  onChange={handleChange}
                  label="Delivery Days"
                  size="small"
                  inputProps={{ style: { color: '#fff' } }}
                >
                  <MenuItem value="Weekdays" style={{ color: '#fff' }}>Weekdays</MenuItem>
                  <MenuItem value="Weekend" style={{ color: '#fff' }}>Weekend</MenuItem>
                  <MenuItem value="All Days" style={{ color: '#fff' }}>All Days</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel style={{ color: '#DFF6FF' }}>Delivery Time</InputLabel>
                <Select
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  label="Delivery Time"
                  size="small"
                  inputProps={{ style: { color: '#fff' } }}
                >
                  <MenuItem value="Morning" style={{ color: '#fff' }}>Morning</MenuItem>
                  <MenuItem value="Evening" style={{ color: '#fff' }}>Evening</MenuItem>
                  <MenuItem value="Night" style={{ color: '#fff' }}>Night</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        {/* Payment Section */}
        <Box sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography variant="subtitle1" sx={{ mb: 1, color: '#DFF6FF' }}>
            Total Amount: Rs.{totalAmount}
          </Typography>

          <Box sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
          }}>
            <StripeCheckout
              stripeKey="pk_test_51QCqZPFDU5aLIEJODMXZ1TrGjcmBHwEJGA5ADUyKW34FJPqWV6PmWQSssWKcxTUDLvXMkNPqO70W5331MkiJYlFt00RIvqYIJJ"
              token={handleStripePayment}
              name="MilkSubz Subscription"
              amount={totalAmount * 100}
              currency="LKR"
            />

            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={onClose}
              sx={{
                color: '#fff',
                borderColor: '#fff',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#16325B',
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SubscriptionForm;



// import React, { useState } from 'react';
// import {
//   TextField,
//   Box,
//   Typography,
//   MenuItem,
//   Select,
//   Button,
//   FormControl,
//   InputLabel,
//   Paper,
// } from '@mui/material';
// import { loadStripe } from '@stripe/stripe-js';

// // Initialize Stripe
// const stripePromise = loadStripe('your_publishable_key');

// const SubscriptionForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     email: '',
//     phone: '',
//     subscriptionPlan: 'weekly',
//     quantity: 1,
//     deliveryDays: 'weekdays',
//     deliveryTime: 'morning',
//   });

//   const [loading, setLoading] = useState(false);

//   const subscriptionPlans = {
//     weekly: {
//       id: 'price_1QOdeAFDU5aLIEJOex4Eb1xK', // Replace with your Stripe Price ID
//       name: '1 Week',
//       basePrice: 1400,
//       interval: 'week',
//     },
//     monthly: {curl http://localhost:5005/

//       id: 'price_1QOdhnFDU5aLIEJOFAahbuXG', // Replace with your Stripe Price ID
//       name: '1 Month',
//       basePrice: 5000,
//       interval: 'month',
//     },
//     quarterly: {
//       id: 'price_1QOdjdFDU5aLIEJOGTveZnB3', // Replace with your Stripe Price ID
//       name: '3 Months',
//       basePrice: 14000,
//       interval: 'month',
//       intervalCount: 3,
//     },
//     biannual: {
//       id: 'price_1QOdl9FDU5aLIEJO03H43kVp', // Replace with your Stripe Price ID
//       name: '6 Months',
//       basePrice: 26000,
//       interval: 'month',
//       intervalCount: 6,
//     },
//     annual: {
//       id: 'price_1QOdmmFDU5aLIEJO9FAlsH4P', // Replace with your Stripe Price ID
//       name: '1 Year',
//       basePrice: 50000,
//       interval: 'year',
//     },
//   };

//   const calculateTotal = () => {
//     const plan = subscriptionPlans[formData.subscriptionPlan];
//     const milkPricePerLiter = 200;
//     const deliveryDaysMultiplier = {
//       weekdays: 5,
//       weekend: 2,
//       all: 7,
//     }[formData.deliveryDays];
    
//     // Calculate total liters per billing cycle
//     const totalLitersPerCycle = formData.quantity * deliveryDaysMultiplier * {
//       week: 1,
//       month: 4,
//       year: 52,
//     }[plan.interval] * (plan.intervalCount || 1);

//     return plan.basePrice + (totalLitersPerCycle * milkPricePerLiter);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const stripe = await stripePromise;
      
//       // Create the subscription on your backend
//       const response = await fetch('/create-subscription', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           name: formData.name,
//           priceId: subscriptionPlans[formData.subscriptionPlan].id,
//           quantity: formData.quantity,
//           deliveryDays: formData.deliveryDays,
//           deliveryTime: formData.deliveryTime,
//           address: formData.address,
//           phone: formData.phone,
//           totalAmount: calculateTotal(),
//         }),
//       });

//       const { sessionId } = await response.json();

//       // Redirect to Stripe Checkout
//       const { error } = await stripe.redirectToCheckout({
//         sessionId,
//       });

//       if (error) {
//         console.error('Error:', error);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
//       <Typography variant="h5" sx={{ mb: 3 }}>
//         Complete Your Milk Subscription
//       </Typography>
      
//       <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//         <TextField
//           label="Name"
//           fullWidth
//           name="name"
//           value={formData.name}
//           onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//           required
//         />
        
//         <TextField
//           label="Email"
//           type="email"
//           fullWidth
//           name="email"
//           value={formData.email}
//           onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
//           required
//         />
        
//         <TextField
//           label="Phone"
//           fullWidth
//           name="phone"
//           value={formData.phone}
//           onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
//           required
//         />
        
//         <TextField
//           label="Delivery Address"
//           fullWidth
//           name="address"
//           value={formData.address}
//           onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
//           required
//           multiline
//           rows={2}
//         />

//         <FormControl fullWidth>
//           <InputLabel>Subscription Plan</InputLabel>
//           <Select
//             value={formData.subscriptionPlan}
//             label="Subscription Plan"
//             onChange={(e) => setFormData(prev => ({ ...prev, subscriptionPlan: e.target.value }))}
//           >
//             {Object.entries(subscriptionPlans).map(([key, plan]) => (
//               <MenuItem key={key} value={key}>
//                 {plan.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <TextField
//           label="Quantity (liters per day)"
//           type="number"
//           fullWidth
//           name="quantity"
//           value={formData.quantity}
//           onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
//           required
//           InputProps={{ inputProps: { min: 1 } }}
//         />

//         <FormControl fullWidth>
//           <InputLabel>Delivery Days</InputLabel>
//           <Select
//             value={formData.deliveryDays}
//             label="Delivery Days"
//             onChange={(e) => setFormData(prev => ({ ...prev, deliveryDays: e.target.value }))}
//           >
//             <MenuItem value="weekdays">Weekdays</MenuItem>
//             <MenuItem value="weekend">Weekend</MenuItem>
//             <MenuItem value="all">All Days</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl fullWidth>
//           <InputLabel>Delivery Time</InputLabel>
//           <Select
//             value={formData.deliveryTime}
//             label="Delivery Time"
//             onChange={(e) => setFormData(prev => ({ ...prev, deliveryTime: e.target.value }))}
//           >
//             <MenuItem value="morning">Morning</MenuItem>
//             <MenuItem value="evening">Evening</MenuItem>
//             <MenuItem value="night">Night</MenuItem>
//           </Select>
//         </FormControl>

//         <Typography variant="h6" sx={{ mt: 2 }}>
//           Total Amount per {subscriptionPlans[formData.subscriptionPlan].interval}: 
//           Rs.{calculateTotal()}
//         </Typography>

//         <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
//           <Button
//             variant="contained"
//             type="submit"
//             disabled={loading}
//             sx={{ flex: 1 }}
//           >
//             {loading ? 'Processing...' : 'Subscribe'}
//           </Button>
//           <Button
//             variant="outlined"
//             onClick={onClose}
//             sx={{ flex: 1 }}
//           >
//             Cancel
//           </Button>
//         </Box>
//       </Box>
//     </Paper>
//   );
// };

// export default SubscriptionForm;


//new
// import React, { useState } from 'react';
// import {
//   TextField,
//   Box,
//   Typography,
//   MenuItem,
//   Select,
//   Button,
//   FormControl,
//   InputLabel,
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers'; // Install @mui/x-date-pickers
// import axios from 'axios';

// const SubscriptionForm = ({ onClose }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     email: '',
//     phone: '',
//     selectedDates: [],
//     subscriptionPlan: '1 week',
//     quantity: 1,
//     deliveryDays: 'Weekdays',
//     deliveryTime: 'Morning',
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleDateChange = (newDate) => {
//     setFormData((prev) => ({
//       ...prev,
//       selectedDates: [...prev.selectedDates, newDate],
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);

//     try {
//       const response = await axios.post('http://localhost:5005/api/subscriptions/create-subscription', {
//         email: formData.email,
//         token: {
//           id: 'tok_visa', // Replace with actual Stripe token from the payment process
//         },
//         subscriptionPlan: formData.subscriptionPlan,
//         deliveryDays: formData.deliveryDays,
//         deliveryTime: formData.deliveryTime,
//         address: formData.address,
//         phone: formData.phone,
//         quantity: formData.quantity,
//         selectedDates: formData.selectedDates,
//       });

//       alert('Subscription created successfully!');
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error creating subscription:', error);
//       alert('Failed to create subscription.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h6" sx={{ mb: 2 }}>
//         Complete Your Subscription
//       </Typography>
//       <TextField
//         label="Name"
//         fullWidth
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         sx={{ mb: 2 }}
//       />
//       <TextField
//         label="Address"
//         fullWidth
//         name="address"
//         value={formData.address}
//         onChange={handleChange}
//         sx={{ mb: 2 }}
//       />
//       <TextField
//         label="Email"
//         fullWidth
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         sx={{ mb: 2 }}
//       />
//       <TextField
//         label="Phone"
//         fullWidth
//         name="phone"
//         value={formData.phone}
//         onChange={handleChange}
//         sx={{ mb: 2 }}
//       />
//       <DatePicker
//         label="Select Dates"
//         onChange={handleDateChange}
//         renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
//       />
//       <Typography variant="body2" sx={{ mb: 2 }}>
//         Selected Dates: {formData.selectedDates.join(', ')}
//       </Typography>
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <InputLabel>Subscription Plan</InputLabel>
//         <Select
//           name="subscriptionPlan"
//           value={formData.subscriptionPlan}
//           onChange={handleChange}
//         >
//           <MenuItem value="1 week">1 Week</MenuItem>
//           <MenuItem value="1 month">1 Month</MenuItem>
//           <MenuItem value="3 months">3 Months</MenuItem>
//           <MenuItem value="6 months">6 Months</MenuItem>
//           <MenuItem value="1 year">1 Year</MenuItem>
//         </Select>
//       </FormControl>
//       <TextField
//         label="Quantity (liters per day)"
//         fullWidth
//         type="number"
//         name="quantity"
//         value={formData.quantity}
//         onChange={handleChange}
//         sx={{ mb: 2 }}
//       />
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <InputLabel>Delivery Days</InputLabel>
//         <Select
//           name="deliveryDays"
//           value={formData.deliveryDays}
//           onChange={handleChange}
//         >
//           <MenuItem value="Weekdays">Weekdays</MenuItem>
//           <MenuItem value="Weekend">Weekend</MenuItem>
//           <MenuItem value="All Days">All Days</MenuItem>
//         </Select>
//       </FormControl>
//       <FormControl fullWidth sx={{ mb: 2 }}>
//         <InputLabel>Delivery Time</InputLabel>
//         <Select
//           name="deliveryTime"
//           value={formData.deliveryTime}
//           onChange={handleChange}
//         >
//           <MenuItem value="Morning">Morning</MenuItem>
//           <MenuItem value="Evening">Evening</MenuItem>
//           <MenuItem value="Night">Night</MenuItem>
//         </Select>
//       </FormControl>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSubmit}
//         disabled={isSubmitting}
//         sx={{ mt: 2 }}
//       >
//         {isSubmitting ? 'Submitting...' : 'Submit'}
//       </Button>
//       <Button variant="outlined" onClick={onClose} sx={{ mt: 2 }}>
//         Cancel
//       </Button>
//     </Box>
//   );
// };

// export default SubscriptionForm;



