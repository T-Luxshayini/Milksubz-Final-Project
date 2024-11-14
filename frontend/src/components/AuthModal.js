// File: /src/components/AuthModal.js
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const AuthModal = () => {
  const [isLoginOpen, setLoginOpen] = useState(true);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const openLogin = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  const openRegister = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
  };

  const closeAllModals = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
  };

  return (
    <>
      {/* Render Login and pass openRegister as a prop */}
      <Login open={isLoginOpen} handleClose={closeAllModals} openRegister={openRegister} />

      {/* Render Register and pass openLogin as a prop */}
      <Register open={isRegisterOpen} handleClose={closeAllModals} openLogin={openLogin} />
    </>
  );
};

export default AuthModal;
