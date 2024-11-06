// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');


// const authRoutes = require('./routes/auth');
// const productRoutes = require('./routes/products');
// const subscriptionRoutes = require('./routes/subscription');
// const adminRoutes = require('./routes/admin');
// const orderRoutes = require('./routes/order'); 

// // Load environment variables
// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('Error connecting to MongoDB:', err));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/subscriptions', subscriptionRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/orders', orderRoutes); // Add the order routes

// const PORT = process.env.PORT || 5005;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // Export the app for testing purposes
// module.exports = app;

const dotenv = require('dotenv'); 
dotenv.config();
const express = require('express'); 
const mongoose = require('mongoose'); 
const cors = require('cors'); 
  
const bodyParser = require('body-parser'); 
const authRoutes = require('./routes/auth.js'); 
const productRoutes = require('./routes/products.js'); 
const subscriptionRoutes = require('./routes/subscription.js'); 
const adminRoutes = require('./routes/admin.js'); 
const orderRoutes = require('./routes/order.js'); 
const stripeRoutes = require('./routes/paymentStripe.js'); 
const cartRoutes = require('./routes/cart.js'); 
const webhookRoutes = require('./routes/webhookRoutes.js');

// Load environment variables



const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/webhook', webhookRoutes);
app.use('/api/cart', (req, res, next) => {
  console.log('Cart route hit');
  next();
}, cartRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app for testing purposes
module.exports = app; // Use export default for ES module
