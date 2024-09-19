// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LandingPageWrapper = styled.div`
  text-align: center;
  padding: 50px;
  background-color: #f0f8ff;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #1e90ff;
  font-size: 3em;
`;

const Subtitle = styled.h2`
  color: #4682b4;
  font-size: 1.5em;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #1e90ff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1.2em;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4169e1;
  }
`;

function LandingPage() {
  return (
    <LandingPageWrapper>
      <Title>Welcome to MilkSubz</Title>
      <Subtitle>Fresh milk and dairy products delivered to your doorstep</Subtitle>
      <p>Subscribe to our service and enjoy farm-fresh milk, ghee, paneer, curd, and more!</p>
      <CTAButton to="/register">Get Started</CTAButton>
    </LandingPageWrapper>
  );
}

export default LandingPage;