import React, { useState } from 'react';
import {
  Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, Divider, List,
  ListItem, ListItemIcon, ListItemText, IconButton
} from '@mui/material';
import {
  AccountCircle, ShoppingCart, Subscriptions, BarChart,
  ChevronLeft, ChevronRight
} from '@mui/icons-material';
import ProductAddEdit from './ProductAddEdit'; // Make sure the path is correct
import milkImage from '../../images/milk.jpg';
import UserDetails from './UserDetails';

const drawerWidthExpanded = 300; 
const drawerWidthCollapsed = 70; 
const appBarHeight = 70; 

function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); // State for sidebar expansion

  // Toggle function for expanding/collapsing the sidebar
  const handleToggleDrawer = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu); // Update the selected menu
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Product Details':
        return <ProductAddEdit />;
      case 'User Details':
        return <UserDetails/>;
      case 'Subscription Details':
        return <Typography variant="h6">Subscription Details Content</Typography>;
      case 'Reports':
        return <Typography variant="h6">Reports Content</Typography>;
      default:
        return <Typography variant="h6">Please select an option from the sidebar</Typography>;
    }
  };

  return (
    <Box component="main"
    sx={{
      flexGrow: 0,
      bgcolor: 'background.default',
      p: 5,
      ml: `${isExpanded ? drawerWidthExpanded : drawerWidthCollapsed}px`,
      backgroundImage: `url(${milkImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <CssBaseline />

      {/* Title Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${isExpanded ? drawerWidthExpanded : drawerWidthCollapsed}px)`,
          ml: `${isExpanded ? drawerWidthExpanded : drawerWidthCollapsed}px`,
          height: `${appBarHeight}px`,
          backgroundColor: '#DA23C9',
        }}
      >
        <Toolbar sx={{ minHeight: `${appBarHeight}px` }}>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
        
      </AppBar>

      {/* Sidebar */}
      <Drawer
        sx={{
          width: isExpanded ? drawerWidthExpanded : drawerWidthCollapsed,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isExpanded ? drawerWidthExpanded : drawerWidthCollapsed,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            transition: 'width 0.3s',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ minHeight: `${appBarHeight}px`, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleToggleDrawer}>
            {isExpanded ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <ListItem button onClick={() => handleMenuClick('User Details')} key="User Details">
            <ListItemIcon><AccountCircle /></ListItemIcon>
            {isExpanded && <ListItemText primary="User Details" />}
          </ListItem>
          <ListItem button onClick={() => handleMenuClick('Product Details')} key="Product Details">
            <ListItemIcon><ShoppingCart /></ListItemIcon>
            {isExpanded && <ListItemText primary="Product Details" />}
          </ListItem>
          <ListItem button onClick={() => handleMenuClick('Subscription Details')} key="Subscription Details">
            <ListItemIcon><Subscriptions /></ListItemIcon>
            {isExpanded && <ListItemText primary="Subscription Details" />}
          </ListItem>
          <Divider />
          <ListItem button onClick={() => handleMenuClick('Reports')} key="Reports">
            <ListItemIcon><BarChart /></ListItemIcon>
            {isExpanded && <ListItemText primary="Reports" />}
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          bgcolor: 'transparent',
          p: 2,
          borderRadius: 1,
          mb:`50px`,
          backgroundColor: 'rgba(255, 255, 255, 0.7)', 
        }}
      >
        <Toolbar />

        {/* Render selected content here */}
        {renderContent()}
      </Box>
    </Box>
  );
}

export default Dashboard;
