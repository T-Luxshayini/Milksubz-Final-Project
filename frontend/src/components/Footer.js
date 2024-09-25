import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #1e90ff;
  color: white;
  padding: 40px 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: left;
  width: 100%;
  position: relative;
  bottom: 0;
`;

const FooterSection = styled.div`
  flex: 1;
  margin: 20px;
`;

const FooterTitle = styled.h3`
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #fff;
  font-weight: bold;
`;

const FooterLink = styled(Link)`
  display: block;
  color: #fff;
  margin-bottom: 8px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SocialMedia = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.5em;
  transition: color 0.3s;
  
  &:hover {
    color: #ff4500;
  }
`;

const Copyright = styled.div`
  background-color: #1e90ff;
  color: white;
  text-align: center;
  padding: 15px 0;
  margin-top: 20px;
  width: 100%;
`;

function Footer() {
  return (
    <>
      <FooterContainer>
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/home">Home</FooterLink>
          <FooterLink to="/products">Products</FooterLink>
          <FooterLink to="/subscriptions">Subscriptions</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <p>Address: 123, Dairy Street, Colombo, Sri Lanka</p>
          <p>Phone: +94 77 123 4567</p>
          <p>Email: support@milksubz.com</p>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Follow Us</FooterTitle>
          <SocialMedia>
            <SocialIcon href="https://facebook.com" target="_blank" aria-label="Facebook">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" aria-label="Twitter">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" aria-label="Instagram">
              <FaInstagram />
            </SocialIcon>
          </SocialMedia>
        </FooterSection>
      </FooterContainer>
      <Copyright>
        <p>&copy; 2023 MilkSubz. All rights reserved.</p>
      </Copyright>
    </>
  );
}

export default Footer;
