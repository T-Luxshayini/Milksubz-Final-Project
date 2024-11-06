// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Pagination, Snackbar, Alert } from '@mui/material';
// import { Card, CardContent, CardMedia, Typography, Button as MuiButton } from '@mui/material';

// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_51QCqZPFDU5aLIEJODMXZ1TrGjcmBHwEJGA5ADUyKW34FJPqWV6PmWQSssWKcxTUDLvXMkNPqO70W5331MkiJYlFt00RIvqYIJJ');
// const PageWrapper = styled.div`
//   background-image: url('/path/to/your/background-image.jpg');
//   background-size: cover;
//   background-position: center;
//   min-height: 100vh;
//   padding: 50px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Title = styled.h2`
//   font-family: 'Arial', sans-serif;
//   font-size: 2.5rem;
//   color: #0D7C66;
//   margin-bottom: 40px;
// `;

// const ProductGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 40px;
//   justify-content: center;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const ProductCard = styled(Card)`
//   transition: transform 0.3s ease, box-shadow 0.3s ease;
//   border: 4px solid #0D7C66;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   border-radius: 8px;
//   overflow: hidden;
//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
//   }
// `;

// const HoverButton = styled(MuiButton)`
//   font-size: 0.875rem;
//   padding: 10px 20px;
//   margin: 5px;
//   transition: all 0.3s ease;
//   background-color: #0D7C66;
//   color: white;
//   border: 2px solid transparent;
  
//   box-shadow: 0 0 5px rgba(13, 124, 102, 0.8), 
//               0 0 10px rgba(13, 124, 102, 0.6), 
//               0 0 15px rgba(13, 124, 102, 0.4);
  
//   &:hover {
//     background-color: #66BB6A;
//     box-shadow: 0 0 10px rgba(13, 124, 102, 1), 
//                 0 0 20px rgba(13, 124, 102, 0.8), 
//                 0 0 30px rgba(13, 124, 102, 0.6);
//   }
// `;

// const ModalWrapper = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ModalContent = styled.div`
//   background: white;
//   padding: 20px;
//   border-radius: 5px;
//   text-align: center;
// `;

// function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [productsPerPage] = useState(6);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5005/api/products');
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Failed to fetch products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

//   const handleAddToCart = (product) => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     cart.push(product);
//     localStorage.setItem('cart', JSON.stringify(cart));
//     setNotification({ open: true, message: `${product.name} added to cart!`, severity: 'success' });
//   };

//   const handleBuyNow = (product) => {
//     navigate('/payment', { state: { product } });
//   };

//   const handleSubscribe = (product) => {
//     setSelectedProduct(product);
//     setShowModal(true);
//   };

//   const handleSubscriptionChoice = async (plan) => {
//     try {
//       // Send request to your backend to create a Stripe checkout session
//       const { data } = await axios.post('http://localhost:5005/api/subscriptions/create-checkout-session', {
//         productId: selectedProduct._id,
//         plan,
//       });
  
//       // Redirect to Stripe checkout page
//       const stripe = await stripePromise;
//       await stripe.redirectToCheckout({ sessionId: data.id });
//     } catch (error) {
//       console.error('Error during Stripe subscription:', error);
//       setNotification({ open: true, message: 'Failed to create subscription session', severity: 'error' });
//     }
//     setShowModal(false);
//   };
  

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   const handleCloseNotification = () => {
//     setNotification({ ...notification, open: false });
//   };

//   return (
//     <PageWrapper>
//       <Title>Our Products</Title>

//       {/* Notification Snackbar positioned a bit below the header */}
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={3000}
//         onClose={handleCloseNotification}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//         sx={{ top: '80px' }}  // Adjusted to show below the header
//       >
//         <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
//           {notification.message}
//         </Alert>
//       </Snackbar>

//       <ProductGrid>
//         {currentProducts.map((product, index) => (
//           <ProductCard key={product._id} sx={{ maxWidth: 300, textAlign: 'center' }}>
//             <CardMedia
//               component="img"
//               height="180"
//               image={product.imageUrl}
//               alt={product.name}
//             />
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="div">
//                 {product.name}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {product.description}
//               </Typography>
//               <Typography variant="body1" color="#41B3A2">
//                 LKR {product.price}
//               </Typography>
//               <Typography variant="body2">
//                 {product.category}
//               </Typography>
//               <HoverButton variant="contained" color='' onClick={() => handleAddToCart(product)}>
//                 Add to Cart
//               </HoverButton>
//               {index === 0 && (
//                 <HoverButton variant="contained" color="success" onClick={() => handleSubscribe(product)}>
//                  Subscribe
//                 </HoverButton>
//               )}
//             </CardContent>
//           </ProductCard>
//         ))}
//       </ProductGrid>

//       <Pagination
//         count={Math.ceil(products.length / productsPerPage)}
//         page={currentPage}
//         onChange={handlePageChange}
//         sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
//       />

//       {showModal && (
//         <ModalWrapper onClick={() => setShowModal(false)}>
//           <ModalContent onClick={(e) => e.stopPropagation()}>
//             <h3>Choose Subscription Plan for {selectedProduct?.name}</h3>
//             <HoverButton onClick={() => handleSubscriptionChoice('1 Week')}>1 Week</HoverButton>
//             <HoverButton onClick={() => handleSubscriptionChoice('1 Month')}>1 Month</HoverButton>
//             <HoverButton onClick={() => setShowModal(false)}>Cancel</HoverButton>
//           </ModalContent>
//         </ModalWrapper>
//       )}
//     </PageWrapper>
//   );
// }

// export default ProductList;
