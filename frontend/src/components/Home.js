import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const ProductCard = ({ name, price, image }) => (
  <div className="product-card">
    <img src={image} alt={name} />
    <h3>{name}</h3>
    <p>${price.toFixed(2)}</p>
    <button>Add to Cart</button>
  </div>
);

const HomePage = () => {
  const bestSellers = [
    { name: "Fresh Banana", price: 4.99, image: "/images/banana.jpg" },
    { name: "Juicy Orange", price: 3.99, image: "/images/orange.jpg" },
    { name: "Sweet Watermelon", price: 5.99, image: "/images/watermelon.jpg" },
    { name: "Mango Juice", price: 2.99, image: "/images/mango-juice.jpg" },
    { name: "Fresh Salmon", price: 12.99, image: "/images/salmon.jpg" },
    { name: "Orange Juice", price: 3.99, image: "/images/orange-juice.jpg" },
    { name: "Strawberry Juice", price: 3.99, image: "/images/strawberry-juice.jpg" },
    { name: "Fresh Vegetables", price: 7.99, image: "/images/vegetables.jpg" },
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Organic Fresh Food</h1>
          <h2>Fresh Juices</h2>
          <Link to="/products" className="cta-button">Shop Now</Link>
        </div>
        <div className="hero-image">
          <img src="/images/hero-juices.png" alt="Fresh Juices" />
        </div>
      </section>

      <section className="best-sellers">
        <h2>Best Sellers Products</h2>
        <div className="product-grid">
          {bestSellers.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </section>

      <section className="featured-product">
        <div className="featured-image">
          <img src="/images/fruits-basket.png" alt="Organic Mountain Navel Natural Fruits Dozen" />
        </div>
        <div className="featured-content">
          <h2>Organic Mountain Navel Natural Fruits Dozen</h2>
          <p className="price">$24.99</p>
          <ul className="features">
            <li>100% Organic</li>
            <li>Fresh Picked</li>
            <li>Free Delivery</li>
          </ul>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </section>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-categories">
          <button className="active">All</button>
          <button>Fruits</button>
          <button>Vegetables</button>
          <button>Juices</button>
          <button>Dried</button>
        </div>
        <div className="product-grid">
          {/* Add featured products here */}
        </div>
      </section>

      <section className="weekly-top-seller">
        <h2>Weekly Top Seller</h2>
        <div className="product-grid">
          {/* Add weekly top sellers here */}
        </div>
      </section>

      <section className="delivery-process">
        <h2>Delivery Process</h2>
        <div className="process-steps">
          <div className="step">
            <img src="/images/icon-order.png" alt="Order" />
            <h3>Order</h3>
            <p>Choose your products</p>
          </div>
          <div className="step">
            <img src="/images/icon-ship.png" alt="Ship" />
            <h3>Ship</h3>
            <p>Process your order</p>
          </div>
          <div className="step">
            <img src="/images/icon-deliver.png" alt="Deliver" />
            <h3>Deliver</h3>
            <p>Product delivery</p>
          </div>
          <div className="step">
            <img src="/images/icon-enjoy.png" alt="Enjoy" />
            <h3>Enjoy</h3>
            <p>Enjoy your products</p>
          </div>
        </div>
      </section>

      <section className="top-categories">
        <h2>Top Categories</h2>
        <div className="category-grid">
          <div className="category-card">
            <img src="/images/category-fruits.jpg" alt="Fresh Fruits" />
            <h3>Fresh Fruits</h3>
            <p>28 Items</p>
          </div>
          {/* Add more category cards here */}
        </div>
      </section>

      <section className="blog-section">
        <h2>From Our Blog</h2>
        <div className="blog-grid">
          <div className="blog-card">
            <img src="/images/blog-1.jpg" alt="Blog post 1" />
            <h3>6 ways to prepare breakfast for 30</h3>
            <p>By Rachi Card • 20 Jan 2024</p>
          </div>
          {/* Add more blog cards here */}
        </div>
      </section>

      <section className="newsletter">
        <h2>Subscribe to Our Newsletter</h2>
        <form className="newsletter-form">
          <input type="email" placeholder="Your email address" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default HomePage;