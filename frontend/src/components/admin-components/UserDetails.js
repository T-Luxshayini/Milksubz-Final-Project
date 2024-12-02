import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Box, Select, MenuItem } from '@mui/material';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin/users`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleEditClick = (id, currentRole) => {
    setEditingUserId(id);
    setSelectedRole(currentRole);
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/admin/users/${id}/role`, { role: newRole }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setUsers((prevUsers) => prevUsers.map((user) =>
        user._id === id ? { ...user, role: newRole } : user
      ));
      setEditingUserId(null);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 100 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      renderCell: (params) => {
        if (editingUserId === params.row._id) {
          return (
            <Select
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value)}
              onBlur={() => handleRoleChange(params.row._id, selectedRole)}
              sx={{
                padding: '0 5px',
                fontSize: '0.875rem',
                minWidth: 100,
              }}
            >
              <MenuItem value="user">user</MenuItem>
              <MenuItem value="admin">admin</MenuItem>
            </Select>
          );
        }
        return (
          <Box display="flex" alignItems="center">
            <span>{params.row.role}</span>
            <IconButton
              onClick={() => handleEditClick(params.row._id, params.row.role)}
              size="small"
              sx={{ marginLeft: 1, padding: 0 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{ width: '100%' }} // Full width to ensure the table centers
    >
      <Box
        sx={{
          height: 600,
          width: '1000px',
          transform: 'scale(1.1)', // Scale the entire DataGrid by 1.2 times
          transformOrigin: 'center', // Keep the scale centered
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          disableColumnMenu
          sx={{
            border: '2px solid #16325B',
            '& .MuiDataGrid-cell': {
              borderColor: '#16325B',
              padding: '0 8px',
              fontSize: '1rem', // Increase font size for the cells
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: '2px solid #16325B',
              fontSize: '1rem', // Increase font size for the column headers
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default UserDetails;
