// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
`;

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Our Products</h2>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            {/* Add subscription button or form here */}
          </ProductCard>
        ))}
      </ProductGrid>
    </div>
  );
}

export default ProductList;