import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
`;


const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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

  const handleAddToCart = (product) => {
    // Add the product to the cart (localStorage or state management)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product) => {
    // Redirect to the payment page
    navigate('/payment', { state: { product } });
  };

  return (
    <div>
     
      <h2>Our Products</h2>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Rs {product.price}.00</p>
            <p>{product.category}</p>
            <img src={product.imageUrl} alt={product.name} width="150" />
            <div>
              <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
              {/* <Button onClick={() => handleBuyNow(product)}>Buy Now</Button> */}
            </div>
          </ProductCard>
        ))}
      </ProductGrid>
    </div>
  );
}

export default ProductList;
