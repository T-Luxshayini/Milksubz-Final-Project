import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PageWrapper = styled.div`
  background-image: url('/path/to/your/background-image.jpg'); /* Add your image path */
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 50px;
`;

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
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
  h3 {
    margin: 10px 0 5px 0;
  }

  p {
    margin: 5px 0;
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

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

const SubscriptionButton = styled(Button)`
  background-color: #28a745;
`;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  const handleBuyNow = (product) => {
    navigate('/payment', { state: { product } });
  };

  const handleSubscribe = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSubscriptionChoice = (plan) => {
    if (plan === '1 Month') {
      // Redirect to the PayHere payment link
      window.location.href = 'https://sandbox.payhere.lk/pay/ob0121425';
    } else {
      alert(`Subscribed to ${plan} for ${selectedProduct.name}`);
    }
    setShowModal(false);
  };

  return (
    <PageWrapper>
      <h2>Our Products</h2>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product._id}>
            <img src={product.imageUrl} alt={product.name} width="180" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Rs {product.price}.00</p>
            <p>{product.category}</p>
            <div>
              <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
              <SubscriptionButton onClick={() => handleSubscribe(product)}>Subscribe</SubscriptionButton>
            </div>
          </ProductCard>
        ))}
      </ProductGrid>

      {/* Modal for subscription selection */}
      {showModal && (
        <ModalWrapper onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3>Choose Subscription Plan for {selectedProduct?.name}</h3>
            <Button onClick={() => handleSubscriptionChoice('1 Week')}>1 Week</Button>
            <Button onClick={() => handleSubscriptionChoice('1 Month')}>1 Month</Button>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
          </ModalContent>
        </ModalWrapper>
      )}
    </PageWrapper>
  );
}

export default ProductList;