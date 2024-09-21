// /src/utils/imageUpload.js

import { Cloudinary } from 'cloudinary-core';

const cloudinary = new Cloudinary({ cloud_name: 'dfspvo34t', secure: true });

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'milksubz');

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/image/upload`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();

  // Check if the upload was successful
  if (!response.ok) {
    throw new Error(data.error?.message || 'Image upload failed');
  }

  // Return the secure URL of the uploaded image
  return data.secure_url;
};