// import React, { useState, useEffect } from 'react';
// import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
// import { useNavigate } from "react-router-dom";
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51QCqZPFDU5aLIEJODMXZ1TrGjcmBHwEJGA5ADUyKW34FJPqWV6PmWQSssWKcxTUDLvXMkNPqO70W5331MkiJYlFt00RIvqYIJJ'); // Replace with your actual publishable key
// console.log('Stripe API Key:', process.env.STRIPE_SECRET_KEY);
// console.log('Webhook Secret:', process.env.STRIPE_WEBHOOK_SECRET);

// function Subscription() {
//   const [userEmail, setUserEmail] = useState("user@example.com"); // Replace with actual user email
//   const [userId, setUserId] = useState("12345"); // Mock user ID
//   const [planType, setPlanType] = useState(""); // Replace with actual plan if needed
//   const navigate = useNavigate();

//   // Define subscription packages
//   const packages = [
//     { name: 'Milk-monthly', price: 6000, id: 'price_1QGj8PFDU5aLIEJObC5Grm70', description: 'Monthly fresh milk delivery', gradient: 'linear-gradient(135deg, #257180, #0093E9)' },
//     { name: 'Milk-weekly', price: 1400, id: 'price_1QHI7PFDU5aLIEJOqhgcevUf', description: 'Weekly fresh milk delivery', gradient: 'linear-gradient(135deg, #257180, #0093E9)' },
//   ];

//   useEffect(() => {
//     // Mock user plan type (if stored elsewhere, fetch it here)
//     setPlanType(""); // Set to current user subscription type if available
//   }, []);

//   // Function to handle subscription checkout
//   // const checkout = (plan) => {
//   //   fetch("http://localhost:5005/api/subscriptions/create-checkout-session", {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify({ plan, customerId: userId }),
//   //   })
//   //     .then((res) => {
//   //       console.log("Response:", res); // Log the raw response
//   //       return res.json();
//   //     })
//   //     .then((data) => {
//   //       console.log("Data:", data); // Log the parsed data
//   //       const { id } = data; // Make sure 'id' exists
//   //       if (id) {
//   //         window.location = `https://checkout.stripe.com/pay/${id}`;
//   //       } else {
//   //         console.error("Checkout session ID is undefined:", data);
//   //       }
//   //     })
//   //     .catch((e) => console.log("Checkout Error:", e));
//   // };

//   const checkout = async (priceId) => {
//     try {
//       const res = await fetch("http://localhost:5005/api/subscriptions/create-checkout-session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ priceId, customerId: userId ,customerEmail: userEmail}),
//       });
  
//       const data = await res.json();
//       if (data.id) {
//         const stripe = await stripePromise;
//         await stripe.redirectToCheckout({ sessionId: data.id });
//       } else {
//         console.error("Failed to create checkout session:", data);
//       }
//     } catch (error) {
//       console.error("Checkout error:", error);
//     }
//   };
  
  

//   return (
//     <Box component="section" py={5} sx={{ background: 'linear-gradient(135deg, #257180, #A7D5A7)', color: '#fff' }}>
//       <Container>
//         <Typography variant="h4" align="center" gutterBottom>Subscription Plans</Typography>
//         <Grid container spacing={4} justifyContent="center">
//           {packages.map((pkg) => (
//             <Grid item key={pkg.id} xs={12} sm={6} md={4}>
//               <Card sx={{ borderRadius: 3, textAlign: 'center', background: pkg.gradient, color: '#fff', boxShadow: 3 }}>
//                 <CardContent>
//                   <Typography variant="h6">{pkg.name}</Typography>
//                   <Typography variant="h4" fontWeight="bold">LKR {pkg.price}</Typography>
//                   <Typography variant="body2" sx={{ my: 2 }}>{pkg.description}</Typography>
//                   <ul style={{ listStyle: 'none', padding: 0 }}>
//                     <li>✔ Fresh milk delivery</li>
//                     <li>✔ Flexible schedule</li>
//                     <li>✔ Quality assurance</li>
//                   </ul>
//                   {planType === pkg.name ? (
//                     <Button disabled variant="contained" sx={{ mt: 2, backgroundColor: 'green', color: '#fff' }}>
//                       Subscribed
//                     </Button>
//                   ) : (
//                     <Button
//                       onClick={() => checkout(pkg.id)}
//                       variant="contained"
//                       sx={{ mt: 2, backgroundColor: '#fff', color: '#257180', borderRadius: 20 }}
//                     >
//                       Choose Plan
//                     </Button>
//                   )}
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

// export default Subscription;


import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY); // Ensure you set this in your environment

function Subscription() {
  const [userEmail, setUserEmail] = useState("user@example.com"); // Replace with actual user email
  const [userId, setUserId] = useState("12345"); // Mock user ID
  const [planType, setPlanType] = useState(""); // Set based on user's current subscription plan if available

  // Define subscription packages
  const packages = [
    { name: 'Milk-monthly', price: 6000, id: 'price_1QGj8PFDU5aLIEJObC5Grm70', description: 'Monthly fresh milk delivery', gradient: 'linear-gradient(135deg, #257180, #0093E9)' },
    // { name: 'Milk-weekly', price: 1400, id: 'price_1QHI7PFDU5aLIEJOqhgcevUf', description: 'Weekly fresh milk delivery', gradient: 'linear-gradient(135deg, #257180, #0093E9)' },
  ];

  useEffect(() => {
    // Mock setting user's current plan (fetch from backend in real scenarios)
    setPlanType(""); 
  }, []);

  const handleSubscription = async (priceId) => {
    try {
      const stripe = await stripePromise;
      const response = await fetch("http://localhost:5005/api/subscriptions/create-stripe-session-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, customerId: userId, customerEmail: userEmail }),
      });

      if (response.status === 409) {
        const data = await response.json();
        if (data && data.redirectUrl) {
          window.location.href = data.redirectUrl; // Redirect to billing portal if already subscribed
        }
      } else {
        const session = await response.json();
        await stripe.redirectToCheckout({ sessionId: session.id });
      }
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <Box component="section" py={5} sx={{ background: 'linear-gradient(135deg, #257180, #A7D5A7)', color: '#fff' }}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>Subscription Plans</Typography>
        <Grid container spacing={4} justifyContent="center">
          {packages.map((pkg) => (
            <Grid item key={pkg.id} xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: 3, textAlign: 'center', background: pkg.gradient, color: '#fff', boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">{pkg.name}</Typography>
                  <Typography variant="h4" fontWeight="bold">LKR {pkg.price}</Typography>
                  <Typography variant="body2" sx={{ my: 2 }}>{pkg.description}</Typography>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li>✔ Fresh milk delivery</li>
                    <li>✔ Flexible schedule</li>
                    <li>✔ Quality assurance</li>
                  </ul>
                  {planType === pkg.name ? (
                    <Button disabled variant="contained" sx={{ mt: 2, backgroundColor: 'green', color: '#fff' }}>
                      Subscribed
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleSubscription(pkg.id)}
                      variant="contained"
                      sx={{ mt: 2, backgroundColor: '#fff', color: '#257180', borderRadius: 20 }}
                    >
                      Choose Plan
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Subscription;
