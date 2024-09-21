// src/components/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f8ff;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #4169e1;
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Load saved email from localStorage on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true); // Check the box if email is saved
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5005/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);

      // Handle "Remember Me"
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email); // Save email
      } else {
        localStorage.removeItem('rememberedEmail'); // Remove email if unchecked
      }

      // Extract user role from response
      const userRole = response.data.user.role;
      
      // Navigate based on user role
      if (userRole === 'admin') {
        navigate('/admin-dashboard'); // Admin-specific page
      } else {
        navigate('/dashboard'); // Regular user dashboard
      }
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <FormWrapper>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Label>
          <Checkbox
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          Remember Me
        </Label>
        <Button type="submit">Login</Button>
      </form>
    </FormWrapper>
  );
}

export default Login;
