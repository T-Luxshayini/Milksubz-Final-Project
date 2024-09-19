// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px 20px;
`;

function Footer() {
  return (
    <FooterContainer>
      <p>&copy; 2023 Fresh Dairy Delights. All rights reserved.</p>
    </FooterContainer>
  );
}

export default Footer;