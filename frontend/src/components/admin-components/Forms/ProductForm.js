import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { uploadImage } from '../../../utils/imageupload'; // Adjust the path if needed

const ProductForm = ({ open, onClose, onSave }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
  });

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
    setProductData({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '',
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Product</DialogTitle>
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
