import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Box, Select, MenuItem } from '@mui/material';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null); // Track the editing state for each row
  const [selectedRole, setSelectedRole] = useState(''); // Track the selected role

  // Fetch users once on mount
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

  // Handle edit icon click
  const handleEditClick = (id, currentRole) => {
    setEditingUserId(id);
    setSelectedRole(currentRole); // Set the current role in the dropdown
  };

  // Handle role change
  const handleRoleChange = async (id, newRole) => {
    try {
      // Send request to update user role in MongoDB
      await axios.put(`http://localhost:5005/api/admin/users/${id}/role`, { role: newRole }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      // Update role in state and exit edit mode
      setUsers((prevUsers) => prevUsers.map((user) => user._id === id ? { ...user, role: newRole } : user));
      setEditingUserId(null); // Close the edit mode after saving
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 100 }, // User ID column
    { field: 'username', headerName: 'Username', width: 150 }, // Username column
    { field: 'firstName', headerName: 'First Name', width: 150 }, // First Name column
    { field: 'lastName', headerName: 'Last Name', width: 150 }, // Last Name column
    { field: 'email', headerName: 'Email', width: 200 }, // Email column
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      renderCell: (params) => {
        // If the current row is being edited, show a dropdown to select role
        if (editingUserId === params.row._id) {
          return (
            <Select
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value)}
              onBlur={() => handleRoleChange(params.row._id, selectedRole)} // Update role when selection is complete
            >
              <MenuItem value="user">user</MenuItem>
              <MenuItem value="admin">admin</MenuItem>
            </Select>
          );
        }
        // Otherwise, show the role with an edit icon
        return (
          <>
            {params.row.role}
            <IconButton
              onClick={() => handleEditClick(params.row._id, params.row.role)} // Click to enter edit mode
              size="small"
              style={{ marginLeft: 10 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </>
        );
      },
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
