import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Adjust the path to your main App component
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Use Day.js adapter
// import dayjs from 'dayjs'; // Install and import dayjs for date manipulation

ReactDOM.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <App />
  </LocalizationProvider>,
  document.getElementById('root')
);
