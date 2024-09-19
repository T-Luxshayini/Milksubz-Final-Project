import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import axios from 'axios'; // for making API requests
import ProductForm from './Forms/ProductForm'; // Import the new form component
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';


const ProductAddEdit = () => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [openForm, setOpenForm] = useState(false); // State to manage form visibility

  // Fetch Products
  useEffect(() => {
    axios.get(`http://localhost:5005/api/products`)
      .then((response) => {
        const updatedRows = response.data.map(row => ({
          ...row,
          id: row._id,
        }));
        setRows(updatedRows);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleAddProduct = (newProduct) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/products`, newProduct)
      .then((response) => {
        setRows((oldRows) => [...oldRows, { ...response.data, id: response.data._id }]);
        setOpenForm(false); // Close the form after saving
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  };

  const handleEditProduct = (id, updatedProduct) => {
    axios.patch(`/api/products/${id}`, updatedProduct)
      .then((response) => {
        setRows((oldRows) =>
          oldRows.map((row) => (row.id === id ? { ...response.data, id: response.data._id } : row))
        );
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  const handleDeleteProduct = (id) => {
    axios.delete(`/api/products/${id}`)
      .then(() => {
        setRows((oldRows) => oldRows.filter((row) => row.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'description', headerName: 'Description', width: 200, editable: true },
    { field: 'price', headerName: 'Price', width: 100, editable: true, type: 'number' },
    { field: 'category', headerName: 'Category', width: 150, editable: true },
    {
      field: 'imageUrl',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.name}
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => handleEditProduct(params.id, params.row)} />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDeleteProduct(params.id)} />,
      ],
    },
  ];

  return (
    <div>
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenForm(true)} // Open form on button click
      >
        Add Product
      </Button>
      <ProductForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleAddProduct}
      />
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          getRowId={(row) => row.id}
        />
      </Box>
    </div>
  );
};

export default ProductAddEdit;
