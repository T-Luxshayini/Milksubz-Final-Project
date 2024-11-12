// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AuthProvider } from '../src/context/AuthContext';
import LandingPage from './components/LandingPage';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import SubscriptionList from './components/SubscriptionList';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/admin-components/AdminDashboard';
import CartPage from './components/CartPage'; 
import PaymentPage from './components/PaymentPage'; 
import OrderPage from './components/OrderPage';
import OrderHistory from './components/OrderHistory';
import PaymentForm from './components/PaymentForm';
import Subscription from './components/SubscriptionPackages';
import { ContactUs } from './components/ContactUs';
import CustomerFeedbacks from './components/customerFeedback';
import RecommendedProducts from './components/RecommendedProducts'; 
import BlogSection from './components/BlogSection';
// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51QCqZPFDU5aLIEJODMXZ1TrGjcmBHwEJGA5ADUyKW34FJPqWV6PmWQSssWKcxTUDLvXMkNPqO70W5331MkiJYlFt00RIvqYIJJ');

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

function App() {
  return (
    <AuthProvider>
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/subscriptions" element={<SubscriptionList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/sub" element={<Subscription />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/feedbacks" element={<CustomerFeedbacks />} />
            <Route path="/recommended-products" element={<RecommendedProducts />} />
            <Route path="/blog" element={<BlogSection />} />
            <Route 
              path="/payment" 
              element={
                <Elements stripe={stripePromise}>
                  <PaymentPage />
                </Elements>
              } 
            />
            <Route 
              path="/payment-form" 
              element={
                <Elements stripe={stripePromise}>
                  <PaymentForm />
                </Elements>
              } 
            />
          </Routes>
        </MainContent>
        
        <Footer />
      </AppContainer>
    </Router>
    </AuthProvider>
  );
}

export default App;
