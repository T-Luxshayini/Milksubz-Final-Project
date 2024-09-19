// src/components/Dashboard.js
// import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';

import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

const NAVIGATION = [
    {
      kind: 'header',
      title: 'Main items',
    },
    {
      segment: 'dashboard',
      title: 'User Details',
      icon: <AccountCircleIcon />,
    },
    {
      segment: 'products',
      title: 'Product Details',
      icon: <ShoppingCartIcon />,
    },
    {
        segment: 'subscription',
        title: 'Subscription Details',
        icon: <SubscriptionsIcon />,
      },
    {
      kind: 'divider',
    },
    {
      kind: 'header',
      title: 'Analytics',
    },
    {
      segment: 'reports',
      title: 'Reports',
      icon: <BarChartIcon />,
      children: [
        {
          segment: 'sales',
          title: 'Sales',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'traffic',
          title: 'Traffic',
          icon: <DescriptionIcon />,
        },
      ],
    },
    {
      segment: 'integrations',
      title: 'Integrations',
      icon: <LayersIcon />,
    },
  ];
  
  const demoTheme = createTheme({
    cssVariables: {
      colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });
  
// function Dashboard() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5005/api/products', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         });
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Failed to fetch products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <DashboardWrapper>
//       {/* Sidebar with buttons */}
//       <Title>Welcome to Admin Dashboard</Title>
//       <Sidebar>
//         <SidebarButton onClick={() => navigate('/user-details')}>User Details</SidebarButton>
//         <SidebarButton onClick={() => navigate('/products-crud')}>Product Details</SidebarButton>
//         <SidebarButton onClick={() => navigate('/subscriptions-crud')}>Subscription Details</SidebarButton>
//       </Sidebar>

//       {/* Main Content */}
//       <MainContent>
//         {/* <Title>Welcome to Admin Dashboard</Title> */}
        
//         <ProductList>
//           {products.map((product) => (
//             <ProductItem key={product.id}>
//               {product.name} - {product.price}
//             </ProductItem>
//           ))}
//         </ProductList>
//       </MainContent>
//     </DashboardWrapper>
//   );

// }

// export default Dashboard;


  
  function DemoPageContent({ pathname }) {
    return (
      <Box
        sx={{
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography>Dashboard content for {pathname}</Typography>
      </Box>
    );
  }
  
  DemoPageContent.propTypes = {
    pathname: PropTypes.string.isRequired,
  };
  
  function Dashboard(props) {
    const { window } = props;
  
    const [pathname, setPathname] = React.useState('/dashboard');
  
    const router = React.useMemo(() => {
      return {
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path) => setPathname(String(path)),
      };
    }, [pathname]);
  
    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;
  
    return (
      // preview-start
      <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout>
          <DemoPageContent pathname={pathname} />
        </DashboardLayout>
      </AppProvider>
      // preview-end
    );
  }
  
  Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
  };
  
  export default Dashboard;