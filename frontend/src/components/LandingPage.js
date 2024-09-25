import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from '/home/uki-jaffna/Documents/Finalproject/Milksubz-Final-Project/frontend/src/images/milkbg.jpg'; 
import Footer from './Footer';
import ProductCarousel from './ProductCarousel';
const LandingPageWrapper = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 50px;
  color: white;
`;

const Title = styled.h1`
  font-size: 4em;
  font-weight: bold;
  margin-bottom: 20px;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const Subtitle = styled.h2`
  font-size: 2em;
  margin-bottom: 40px;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const CTAButton = styled(Link)`
  padding: 15px 30px;
  background-color: #1e90ff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.5em;
  font-weight: bold;
  transition: background-color 0.3s;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #ff4500;
  }
`;

const InfoSection = styled.div`
  margin-top: 50px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  color: #333;
  max-width: 900px;
  text-align: left;
`;

const InfoTitle = styled.h3`
  font-size: 2em;
  margin-bottom: 20px;
`;

const InfoParagraph = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
`;

function LandingPage() {
  return (
    <LandingPageWrapper>
      <Title>Welcome to MilkSubz</Title>
      <Subtitle>Delivering fresh milk and dairy products right to your doorstep</Subtitle>
      <ButtonGroup>
        <CTAButton to="/products">View Products</CTAButton>
        <CTAButton to="/register">Subscribe Now</CTAButton>
      </ButtonGroup>
      <ProductCarousel />
      <InfoSection>
        <InfoTitle>About MilkSubz</InfoTitle>
        <InfoParagraph>
          MilkSubz offers the freshest milk, directly from our farms to your home. Our range includes cow milk,
          paneer, ghee, curd, and more. We believe in delivering high-quality dairy products to support healthy lifestyles.
        </InfoParagraph>
        <InfoParagraph>
          Join our subscription service to never run out of your favorite dairy products, delivered fresh every morning.
        </InfoParagraph>
      </InfoSection>
      {/* <ProductCarousel /> */}
      <Footer/>
    </LandingPageWrapper>
  );
}

export default LandingPage;
