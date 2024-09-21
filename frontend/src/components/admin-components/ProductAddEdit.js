import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import axios from 'axios'; 
import ProductForm from './Forms/ProductForm';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

const ProductAddEdit = () => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [openForm, setOpenForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // State for the currently edited product
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Products once on mount
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

  const handleAddProduct = async (newProduct) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    const token = localStorage.getItem('token');

    try {
      if (currentProduct) {
        //console.log("exist product");
        const response = await axios.patch(`http://localhost:5005/api/products/${currentProduct.id}`, newProduct, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRows((oldRows) =>
          oldRows.map((row) => (row.id === currentProduct.id ? { ...response.data, id: response.data._id } : row))
        );
      } else {
        // Adding a new product
        const response = await axios.post(`http://localhost:5005/api/products`, newProduct, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const addedProduct = { ...response.data, id: response.data._id };
        setRows((prevRows) => [...prevRows, addedProduct]);
      }

      setOpenForm(false);
      setCurrentProduct(null); // Reset current product after save
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProduct = (id) => {
    const productToEdit = rows.find(row => row.id === id);
    console.log(productToEdit);
    setCurrentProduct(productToEdit);
    setOpenForm(true); // Open form for editing
  };

  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:5005/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRows((oldRows) => oldRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
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
        <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={() => handleEditProduct(params.id)} />,
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDeleteProduct(params.id)} />,
      ],
    },
  ];

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {setCurrentProduct(null); setOpenForm(true); }} // Open form for adding a new product
      >
        Add Product
      </Button>
      <ProductForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSave={handleAddProduct}
        product={currentProduct}
      />
      <Box sx={{ height: 500, width: '100%'}}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          getRowId={(row) => row.id}
          style={{ height: 500, width: '100%' }} 
        />
      </Box>
    </div>
  );
};

export default ProductAddEdit;
