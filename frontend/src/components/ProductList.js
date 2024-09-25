import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselContainer = styled.div`
  margin: 50px auto;
  max-width: 80%;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ProductInfo = styled.div`
  text-align: center;
  padding: 10px;
`;

const ProductName = styled.h3`
  margin: 10px 0;
  color: #333;
`;

const ProductPrice = styled.p`
  color: #007bff;
  font-size: 1.2em;
`;

const ProductCarousel = () => {
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

  if (!products || products.length === 0) {
    return <p>Loading products...</p>; // Handle empty or undefined products
  }

  return (
    <CarouselContainer>
      <Carousel
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
        stopOnHover={true}
        showStatus={false}
        showArrows={true}
      >
        {products.map((product) => (
          <div key={product._id}>
            <ProductImage src={product.imageUrl} alt={product.name} />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>Rs {product.price}</ProductPrice>
              <p>{product.description}</p>
            </ProductInfo>
          </div>
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default ProductCarousel;
