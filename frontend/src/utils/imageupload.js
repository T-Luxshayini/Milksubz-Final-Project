// /src/utils/imageUpload.js

import { Cloudinary } from 'cloudinary-core';

const cloudinary = new Cloudinary({ cloud_name: 'your_cloud_name', secure: true });

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'your_upload_preset');

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/image/upload`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return data.secure_url; // Return image URL after upload
};
