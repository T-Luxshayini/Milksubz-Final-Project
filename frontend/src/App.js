// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import SubscriptionList from './components/SubscriptionList';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/admin-components/AdminDashboard'
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
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
          <Route path="/home" element={<Home />} />
            <Route path="/" element={<LandingPage />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/subscriptions" element={<SubscriptionList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import UserList from './components/admin/UserManagement/UserList';
// import ProductList from './components/admin/ProductManagement/ProductList';
// import SubscriptionList from './components/admin/SubscriptionManagement/SubscriptionList';

// const App = () => {
//   return (
//     <Router>
//       <nav>
//         <Link to="/users">User Management</Link>
//         <Link to="/products">Product Management</Link>
//         <Link to="/subscriptions">Subscription Management</Link>
//       </nav>
//       <Routes>
//         <Route path="/users" element={<UserList />} />
//         <Route path="/products" element={<ProductList />} />
//         <Route path="/subscriptions" element={<SubscriptionList />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
