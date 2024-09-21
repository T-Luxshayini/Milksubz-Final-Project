// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const DashboardWrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  color: #1e90ff;
`;

const ProductList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ProductItem = styled.li`
  background-color: #f0f8ff;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
`;

const ProductImage = styled.img`
  width: 200px;
  height: auto;
  border-radius: 5px;
  margin-top: 10px;
`;

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/products', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <DashboardWrapper>
      <Title>Welcome to Your Dashboard</Title>
      <h2>Available Products:</h2>
      <ProductList>
        {products.map((product) => (
          <ProductItem key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: Rs{product.price}</p>
            <p>Category: {product.category}</p>
            <ProductImage src={product.imageUrl} alt={product.name} />
          </ProductItem>
        ))}
      </ProductList>
    </DashboardWrapper>
  );
}

export default Dashboard;
