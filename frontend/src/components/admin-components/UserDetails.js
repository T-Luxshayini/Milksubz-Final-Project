import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Box } from '@mui/material';

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  // Fetch Users once on mount
  useEffect(() => {
    axios.get('http://localhost:5005/api/admin/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); // Use _id here
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 100 }, // Use _id here for display
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 120 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteUser(params.id)} // Here, params.id will be _id
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row._id} // Use _id for unique row id
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
      />
    </Box>
  );
};

export default UserDetails;
