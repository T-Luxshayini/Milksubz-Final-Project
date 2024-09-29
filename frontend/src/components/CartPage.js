// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// // Wrapper for the whole cart page with background image and centered content
// const CartWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   background-image: url(${require('/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/milk.jpg')});
//   background-size: cover;
//   background-position: center;
//   padding: 20px;
// `;

// // Expanding the size of the cart container
// const CartContainer = styled.div`
//   background-color: rgba(255, 255, 255, 0.5);
//   backdrop-filter: blur(10px);
//   border-radius: 10px;
//   padding: 40px;
//   box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
//   max-width: 800px;
//   width: 100%;
// `;

// // Header styling
// const CartHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;
// `;

// // Styling for individual cart items
// const CartItem = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   border-bottom: 1px solid #ddd;
//   padding: 15px 0;
//   cursor: pointer;
// `;

// // Styling for cart details
// const CartDetails = styled.div`
//   flex-grow: 1;
//   margin-left: 10px;
// `;

// // Styling for the cart item name
// const CartItemName = styled.h3`
//   margin: 0;
// `;

// // Quantity button wrapper
// const CartQuantity = styled.div`
//   display: flex;
//   align-items: center;
// `;

// // Button for increasing or decreasing quantity
// const QuantityButton = styled.button`
//   background-color: #ddd;
//   border: none;
//   padding: 5px 10px;
//   cursor: pointer;
// `;

// // Price styling
// const CartPrice = styled.p`
//   margin-left: 10px;
// `;

// // Delete button styling
// const DeleteButton = styled.button`
//   background-color: transparent; /* Make the button transparent */
//   border: none;
//   cursor: pointer;
//   margin-left: 10px; /* Add some space between the price and icon */
// `;

// // Buy Now button styling
// // const Button = styled.button`
// //   background-color: #007bff;
// //   color: white;
// //   border: none;
// //   padding: 10px 15px;
// //   border-radius: 5px;
// //   cursor: pointer;
// //   margin-top: 20px;
// // `;

// function CartPage() {
//   const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
//   const navigate = useNavigate();

//   const handleItemClick = (item) => {
//     navigate('/order', { state: { item } });
//   };

//   const handleDeleteItem = (itemToDelete) => {
//     const updatedCart = cart.filter(item => item.name !== itemToDelete.name);
//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
//   };

//   return (
//     <CartWrapper>
//       <CartContainer>
//         <CartHeader>
//           <h2>Your Cart</h2>
//           <span>{cart.length} items</span>
//         </CartHeader>

//         {cart.length > 0 ? (
//           cart.map((item, index) => (
//             <CartItem key={index} onClick={() => handleItemClick(item)}>
//               <img src={item.imageUrl} alt={item.name} width="60" />
//               <CartDetails>
//                 <CartItemName>{item.name}</CartItemName>
//                 <p>{item.description}</p>
//               </CartDetails>
//               <CartQuantity>
//                 <QuantityButton>-</QuantityButton>
//                 <span>{item.quantity || 1}</span>
//                 <QuantityButton>+</QuantityButton>
//               </CartQuantity>
//               <CartPrice>Rs {item.price}</CartPrice>
//               <DeleteButton onClick={(e) => { e.stopPropagation(); handleDeleteItem(item); }}>
//                 <FontAwesomeIcon icon={faTrashAlt} color="red" />
//               </DeleteButton>
//             </CartItem>
//           ))
//         ) : (
//           <p>Your cart is empty</p>
//         )}

//         {/* {cart.length > 0 && <Button onClick={() => navigate('/order')}>Proceed to Checkout</Button>} */}
//       </CartContainer>
//     </CartWrapper>
//   );
// }

// export default CartPage;

import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// Wrapper for the whole cart page with background image and centered content
const CartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${require('../images/milk.jpg')});
  background-size: cover;
  background-position: center;
  padding: 20px;
`;

// Expanding the size of the cart container
const CartContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
`;

// Header styling
const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// Styling for individual cart items
const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
  cursor: pointer;
`;

// Styling for cart details
const CartDetails = styled.div`
  flex-grow: 1;
  margin-left: 10px;
`;

// Styling for the cart item name
const CartItemName = styled.h3`
  margin: 0;
`;

// Quantity button wrapper
const CartQuantity = styled.div`
  display: flex;
  align-items: center;
`;

// Button for increasing or decreasing quantity
const QuantityButton = styled.button`
  background-color: #ddd;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

// Price styling
const CartPrice = styled.p`
  margin-left: 10px;
`;

// Delete button styling
const DeleteButton = styled.button`
  background-color: transparent; /* Make the button transparent */
  border: none;
  cursor: pointer;
  margin-left: 10px; /* Add some space between the price and icon */
`;

// Proceed to Checkout button styling
const CheckoutButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

function CartPage() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate('/order', { state: { item } });
  };

  const handleDeleteItem = (itemToDelete) => {
    const updatedCart = cart.filter(item => item.name !== itemToDelete.name);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  const handleCheckout = () => {
    document.getElementById('payhere-form').submit();
  };

  return (
    <CartWrapper>
      <CartContainer>
        <CartHeader>
          <h2>Your Cart</h2>
          <span>{cart.length} items</span>
        </CartHeader>

        {cart.length > 0 ? (
          <>
            {cart.map((item, index) => (
              <CartItem key={index} onClick={() => handleItemClick(item)}>
                <img src={item.imageUrl} alt={item.name} width="60" />
                <CartDetails>
                  <CartItemName>{item.name}</CartItemName>
                  <p>{item.description}</p>
                </CartDetails>
                <CartQuantity>
                  <QuantityButton>-</QuantityButton>
                  <span>{item.quantity || 1}</span>
                  <QuantityButton>+</QuantityButton>
                </CartQuantity>
                <CartPrice>Rs {item.price}</CartPrice>
                <DeleteButton onClick={(e) => { e.stopPropagation(); handleDeleteItem(item); }}>
                  <FontAwesomeIcon icon={faTrashAlt} color="red" />
                </DeleteButton>
              </CartItem>
            ))}
            <CheckoutButton onClick={handleCheckout}>Proceed to Checkout</CheckoutButton>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}

        {/* Hidden PayHere form */}
        {cart.length > 0 && (
          <form
            id="payhere-form"
            method="POST"
            action="https://sandbox.payhere.lk/pay/checkout"
            style={{ display: 'none' }} // Hide the form
          >
            <input type="hidden" name="merchant_id" value="1228322" />
            <input type="hidden" name="return_url" value="http://localhost:3000/cart" />
            <input type="hidden" name="cancel_url" value="http://localhost:3000/cancel" />
            <input type="hidden" name="notify_url" value="http://localhost:3000/notify" />
            <input type="hidden" name="order_id" value="1727630969594" />
            <input type="hidden" name="items" value={cart.map(item => item.name).join(', ')} />
            <input type="hidden" name="currency" value="Rs" />
            <input type="hidden" name="amount" value="300.00" />

            {/* Customer Info */}
            <input type="hidden" name="first_name" value="John" />
            <input type="hidden" name="last_name" value="Doe" />
            <input type="hidden" name="email" value="john@example.com" />
            <input type="hidden" name="phone" value="0771234567" />
            <input type="hidden" name="address" value="123, ABC Street, Colombo" />
            <input type="hidden" name="city" value="Colombo" />
          </form>
        )}
      </CartContainer>
    </CartWrapper>
  );
}

export default CartPage;
