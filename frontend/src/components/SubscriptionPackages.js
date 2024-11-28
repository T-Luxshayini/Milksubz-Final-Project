// import React from 'react';
// import { 
//   Box, 
//   Container, 
//   Typography, 
//   Grid, 
//   Card, 
//   CardContent, 
//   Button,
//   Paper
// } from '@mui/material';

// const SubscriptionShowcase = () => {
//   const subscriptionFeatures = [
//     {
//       icon: "🥛",
//       title: "Fresh Daily Delivery",
//       description: "Get farm-fresh milk delivered to your doorstep every morning"
//     },
//     {
//       icon: "📅",
//       title: "Flexible Schedule",
//       description: "Choose your delivery days and easily modify your schedule"
//     },
//     {
//       icon: "💰",
//       title: "Cost Effective",
//       description: "Save more with our monthly subscription packages"
//     },
//     {
//       icon: "✨",
//       title: "Premium Quality",
//       description: "100% pure and quality-tested dairy products"
//     }
//   ];

//   const stats = [
//     { value: "5000+", label: "Active Subscribers" },
//     { value: "98%", label: "Satisfaction Rate" },
//     { value: "365", label: "Days of Service" },
//     { value: "30+", label: "Products Available" }
//   ];

//   return (
//     <Box sx={{ 
//       py: 8,
//       background: 'linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%)'
//     }}>
//       <Container maxWidth="lg">
//         {/* Header Section */}
//         <Box sx={{ textAlign: 'center', mb: 6 }}>
//           <Typography variant="h3" component="h2" sx={{ 
//             color: '#16325B',
//             fontWeight: 'bold',
//             mb: 2
//           }}>
//             Why Subscribe with Us?
//           </Typography>
//           <Typography variant="h6" sx={{ 
//             color: 'text.secondary',
//             maxWidth: '800px',
//             mx: 'auto'
//           }}>
//             Join thousands of happy customers who enjoy our premium milk subscription service
//           </Typography>
//         </Box>

//         {/* Features Grid */}
//         <Grid container spacing={4} sx={{ mb: 8 }}>
//           {subscriptionFeatures.map((feature, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Card sx={{
//                 height: '100%',
//                 transition: 'transform 0.3s, box-shadow 0.3s',
//                 '&:hover': {
//                   transform: 'translateY(-8px)',
//                   boxShadow: 6,
//                 },
//                 border: '2px solid #0D7C66',
//               }}>
//                 <CardContent sx={{ textAlign: 'center' }}>
//                   <Typography variant="h2" sx={{ mb: 2 }}>
//                     {feature.icon}
//                   </Typography>
//                   <Typography variant="h6" sx={{ 
//                     mb: 1,
//                     color: '#16325B',
//                     fontWeight: 'bold'
//                   }}>
//                     {feature.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {feature.description}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* CTA Section */}
//         <Paper sx={{
//           p: 6,
//           textAlign: 'center',
//           background: 'linear-gradient(135deg, #16325B, #78B7D0)',
//           color: 'white',
//           borderRadius: 4,
//           mb: 8
//         }}>
//           <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
//             Start Your Fresh Dairy Journey Today
//           </Typography>
//           <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
//             Subscribe now and get your first delivery free! Cancel anytime.
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: '#FFDC7F',
//                 color: '#16325B',
//                 padding: '10px 20px',
//                 borderRadius: '50px',
//                 fontWeight: 'bold',
//                 '&:hover': {
//                   backgroundColor: '#FFE39F'
//                 }
//               }}
//             >
//               View Plans
//             </Button>
//             <Button
//               variant="outlined"
//               sx={{
//                 borderColor: 'white',
//                 color: 'white',
//                 padding: '10px 20px',
//                 borderRadius: '50px',
//                 fontWeight: 'bold',
//                 '&:hover': {
//                   borderColor: 'white',
//                   backgroundColor: 'rgba(255,255,255,0.1)'
//                 }
//               }}
//             >
//               Learn More
//             </Button>
//           </Box>
//         </Paper>

//         {/* Stats Section */}
//         <Grid container spacing={4}>
//           {stats.map((stat, index) => (
//             <Grid item xs={6} md={3} key={index} sx={{ textAlign: 'center' }}>
//               <Typography variant="h4" sx={{ 
//                 color: '#16325B',
//                 fontWeight: 'bold',
//                 mb: 1
//               }}>
//                 {stat.value}
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 {stat.label}
//               </Typography>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default SubscriptionShowcase;


import React, { useState } from "react";
import { Container, Grid, Card, CardContent, Typography, Button, Box, Paper } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function Subscription() {
  const navigate = useNavigate();
  const [planType] = useState("");

  const getUserData = () => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  };

  const packages = [
    {
      name: "Milk-monthly",
      price: 6000,
      id: "price_1QGj8PFDU5aLIEJObC5Grm70",
      description: "Monthly fresh milk delivery",
      gradient: "linear-gradient(135deg, #257180, #0093E9)",
    },
  ];

  const subscriptionFeatures = [
    {
      icon: "🥛",
      title: "Fresh Daily Delivery",
      description: "Get farm-fresh milk delivered to your doorstep every morning",
    },
    {
      icon: "📅",
      title: "Flexible Schedule",
      description: "Choose your delivery days and easily modify your schedule",
    },
    {
      icon: "💰",
      title: "Cost Effective",
      description: "Save more with our monthly subscription packages",
    },
    {
      icon: "✨",
      title: "Premium Quality",
      description: "100% pure and quality-tested dairy products",
    },
  ];

  const stats = [
    { value: "5000+", label: "Active Subscribers" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "365", label: "Days of Service" },
    { value: "30+", label: "Products Available" },
  ];

  const handleSubscription = async (priceId) => {
    const currentUser = getUserData();

    if (!currentUser) {
      alert("Please login to subscribe");
      navigate("/login");
      return;
    }

    try {
      const stripe = await stripePromise;
      const response = await fetch("http://localhost:5005/api/subscriptions/create-stripe-session-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          priceId,
          userId: currentUser._id,
          userEmail: currentUser.email,
        }),
      });

      if (response.status === 401) {
        alert("Please login to continue");
        navigate("/login");
        return;
      }

      if (response.status === 409) {
        const data = await response.json();
        if (data && data.redirectUrl) {
          window.location.href = data.redirectUrl;
        }
      } else if (response.ok) {
        const session = await response.json();
        await stripe.redirectToCheckout({ sessionId: session.id });
      } else {
        console.error("Unexpected error:", response.statusText);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Box
      component="section"
      style={{
        width: "100%",
        background: "linear-gradient(135deg, #d5d5d0, #e4e4dc, #dce4dc, #e4e4e4)", // Updated gradient background
        padding: "40px 0",
        margin: 0,
        boxSizing: "border-box", // Ensures padding doesn't affect the width
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h4" component="h2" sx={{ color: "#16325B", fontWeight: "bold", mb: 2 }}>
            Why Subscribe with Us?
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary", maxWidth: "800px", mx: "auto" }}>
            Join thousands of happy customers who enjoy our premium milk subscription service
          </Typography>
        </Box>

        {/* Subscription Features */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {subscriptionFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": { transform: "translateY(-8px)", boxShadow: 6 },
                  border: "2px solid #16325B", // Updated border color
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1, color: "#16325B", fontWeight: "bold" }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            background: "linear-gradient(135deg, #16325B, #78B7D0)",
            color: "white",
            borderRadius: 4,
            mb: 8,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
            Start Your Fresh Dairy Journey Today
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Subscribe now and get your first delivery free! Cancel anytime.
          </Typography>
        </Paper>

        {/* Subscription Plans Without Background Color */}
        <Box sx={{ py: 5, borderRadius: 3, mb: 5 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Subscription Plans
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {packages.map((pkg) => (
              <Grid item key={pkg.id} xs={12} sm={8} md={6} lg={4}>
                <Card sx={{ borderRadius: 3, textAlign: "center", background: pkg.gradient, color: "#fff", boxShadow: 4, padding: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{pkg.name}</Typography>
                    <Typography variant="h4" fontWeight="bold">LKR {pkg.price}</Typography>
                    <Typography variant="body2" sx={{ my: 2 }}>{pkg.description}</Typography>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      <li>✔ Fresh milk delivery</li>
                      <li>✔ Flexible schedule</li>
                      <li>✔ Quality assurance</li>
                    </ul>
                    {planType === pkg.name ? (
                      <Button disabled variant="contained" sx={{ mt: 2, backgroundColor: "green", color: "#fff" }}>
                        Subscribed
                      </Button>
                    ) : (
                      <Button onClick={() => handleSubscription(pkg.id)} variant="contained" sx={{ mt: 2, backgroundColor: "#fff", color: "#257180", borderRadius: 20 }}>
                        Choose Plan
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={4} sx={{ mt: 8 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index} sx={{ textAlign: "center" }}>
              <Typography variant="h4" sx={{ color: "#16325B", fontWeight: "bold", mb: 1 }}>{stat.value}</Typography>
              <Typography variant="body1" color="text.secondary">{stat.label}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Subscription;
