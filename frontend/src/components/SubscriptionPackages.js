import React, { useState } from "react";
import { Container, Grid, Card, CardContent, Typography, Button, Box } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function Subscription() {
  const navigate = useNavigate();
  const [planType, setPlanType] = useState("");
  
  // Get user data from localStorage instead of AuthContext
  const getUserData = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  };

  const packages = [
    { 
      name: 'Milk-monthly', 
      price: 6000, 
      id: 'price_1QGj8PFDU5aLIEJObC5Grm70', 
      description: 'Monthly fresh milk delivery', 
      gradient: 'linear-gradient(135deg, #257180, #0093E9)' 
    }
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
          "Authorization": `Bearer ${localStorage.getItem('token')}` // Add auth token if you're using one
        },
        body: JSON.stringify({ 
          priceId,
          userId: currentUser._id,
          userEmail: currentUser.email
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