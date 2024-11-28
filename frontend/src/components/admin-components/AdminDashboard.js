import React, { useState } from 'react';
import {
  Box, CssBaseline, Drawer, Typography, Divider, List,
  ListItem, ListItemIcon, ListItemText, IconButton
} from '@mui/material';
import {
  AccountCircle, Subscriptions,
  ChevronLeft, ChevronRight, Storefront
} from '@mui/icons-material';
import { MailOutline } from '@mui/icons-material';
import ProductAddEdit from './ProductAddEdit';
// import milkImage from '/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/splashmilk.jpeg';
import UserDetails from './UserDetails';
// import { useNavigate } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AdminOrders from './AdminOrders';
import SubscriptionDetails from './SubscriptionDetails';
import ContactMessages from './ContactMessages';

const drawerWidthExpanded = 300; 
const drawerWidthCollapsed = 70;

function Dashboard() {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  // const navigate = useNavigate();

  // Toggle function for expanding/collapsing the sidebar
  const handleToggleDrawer = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Product Details':
        return <ProductAddEdit />;
      case 'User Details':
        return <UserDetails />;
      case 'Order Details':
        return <AdminOrders />;
      case 'Subscription Details':
        return <SubscriptionDetails />;
      case 'Contact Messages':
        return <ContactMessages />;
      default:
        return <Typography variant="h6">Please select an option from the sidebar</Typography>;
    }
  };

  return (
    <div>
      <Box component="main"
        sx={{
          flexGrow: 0,
          bgcolor: 'background.default',
          p: 5,
          ml: `${isExpanded ? drawerWidthExpanded : drawerWidthCollapsed}px`,
          // backgroundImage: `url(${milkImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        <CssBaseline />

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
              backgroundColor: '#16325B',  // Set the background color here
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
            <IconButton onClick={handleToggleDrawer}>
              {isExpanded ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Box>
          <Divider />
          <List>
            <ListItem button onClick={() => handleMenuClick('User Details')} key="User Details">
              <ListItemIcon sx={{ color: 'white' }}><AccountCircle /></ListItemIcon> {/* Icon color to white */}
              {isExpanded && <ListItemText primary="User Details" />}
            </ListItem>
            <ListItem button onClick={() => handleMenuClick('Product Details')} key="Product Details">
              <ListItemIcon sx={{ color: 'white' }}><Storefront /></ListItemIcon> {/* Icon color to white */}
              {isExpanded && <ListItemText primary="Product Details" />}
            </ListItem>
            <ListItem button onClick={() => handleMenuClick('Order Details')} key="Order Details">
              <ListItemIcon sx={{ color: 'white' }}><ListAltIcon /></ListItemIcon> {/* Icon color to white */}
              {isExpanded && <ListItemText primary="Order Details" />}
            </ListItem>
            <ListItem button onClick={() => handleMenuClick('Subscription Details')} key="Subscription Details">
              <ListItemIcon sx={{ color: 'white' }}><Subscriptions /></ListItemIcon> {/* Icon color to white */}
              {isExpanded && <ListItemText primary="Subscription Details" />}
            </ListItem>
            <Divider />
            <ListItem button onClick={() => handleMenuClick('Contact Messages')} key="Contact Messages">
              <ListItemIcon sx={{ color: 'white' }}><MailOutline /></ListItemIcon> {/* Icon color to white */}
              {isExpanded && <ListItemText primary="Contact Messages" />}
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
            mb: '50px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)', 
          }}
        >
          {/* Render selected content here */}
          {renderContent()}
        </Box>
      </Box>
    </div>
  );
}

export default Dashboard;
