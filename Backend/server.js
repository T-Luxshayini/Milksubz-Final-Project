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


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const subscriptionRoutes = require('./routes/subscription');
const adminRoutes = require('./routes/admin');
const orderRoutes = require('./routes/order'); 
// const payhereRoutes = require('./routes/PayHere'); // Import the new payment routes


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
// app.use('/api/payhere', payhereRoutes);
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app for testing purposes
module.exports = app;
 