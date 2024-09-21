import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { uploadImage } from '../../../utils/imageupload'; // Adjust the path if needed

const ProductForm = ({ open, onClose, onSave, product }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
  });

  // Update productData when the product prop changes or reset when product is null (adding a new product)
  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        imageUrl: product.imageUrl,
      });
    } else {
      // Reset the form when product is null (for adding a new product)
      setProductData({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
      });
    }
  }, [product]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const imageUrl = await uploadImage(file);
    setProductData((prevData) => ({ ...prevData, imageUrl }));
  };

  const handleSaveClick = () => {
    onSave(productData);
    onClose(); // Optionally close the dialog after saving
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{product ? 'Edit Product' : 'Add Product'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Product Name"
          type="text"
          fullWidth
          variant="standard"
          value={productData.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Product Description"
          type="text"
          fullWidth
          variant="standard"
          value={productData.description}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="price"
          label="Product Price"
          type="number"
          fullWidth
          variant="standard"
          value={productData.price}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="category"
          label="Product Category"
          type="text"
          fullWidth
          variant="standard"
          value={productData.category}
          onChange={handleInputChange}
        />
        <input type="file" onChange={handleImageUpload} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSaveClick}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
