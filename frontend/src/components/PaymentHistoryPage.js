// import React from 'react';
// import styled from 'styled-components';

// // Wrapper for the whole payment history page with background image and centered content
// const PaymentHistoryWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   background-image: url(${require('/home/uki-jaffna/Documents/Milksubz-Final-Project/frontend/src/images/milk.jpg')}); /* Ensure you give the correct relative path */
//   background-size: cover;
//   background-position: center;
//   padding: 20px;
// `;

// // Payment history container with styling
// const PaymentHistoryContainer = styled.div`
//   background-color: white;
//   border-radius: 10px;
//   padding: 40px;
//   box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
//   max-width: 800px;
//   width: 100%;
// `;

// // Header styling for the page
// const PaymentHistoryHeader = styled.h2`
//   margin-bottom: 20px;
//   text-align: center;
//   color: #333;
// `;

// // Styling for individual payment items
// const PaymentItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   border-bottom: 1px solid #ddd;
//   padding: 15px 0;
// `;

// // Styling for payment details
// const PaymentDetail = styled.p`
//   margin: 5px 0;
//   color: #555;
//   font-weight: bold;

//   & strong {
//     color: #333;
//   }
// `;

// // Styling for the "No payments" message
// const NoPaymentsMessage = styled.p`
//   text-align: center;
//   font-size: 18px;
//   color: #999;
// `;

// function PaymentHistoryPage() {
//   const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory')) || [];

//   return (
//     <PaymentHistoryWrapper>
//       <PaymentHistoryContainer>
//         <PaymentHistoryHeader>Payment History</PaymentHistoryHeader>

//         {paymentHistory.length > 0 ? (
//           paymentHistory.map((payment, index) => (
//             <PaymentItem key={index}>
//               <PaymentDetail><strong>Product:</strong> {payment.name}</PaymentDetail>
//               <PaymentDetail><strong>Quantity:</strong> {payment.quantity}</PaymentDetail>
//               <PaymentDetail><strong>Total Price:</strong> Rs {payment.totalPrice}</PaymentDetail>
//               <PaymentDetail><strong>Address:</strong> {payment.address}</PaymentDetail>
//               <PaymentDetail><strong>Phone Number:</strong> {payment.phoneNumber}</PaymentDetail>
//               <PaymentDetail><strong>Date:</strong> {payment.date}</PaymentDetail>
//             </PaymentItem>
//           ))
//         ) : (
//           <NoPaymentsMessage>No payments made yet.</NoPaymentsMessage>
//         )}
//       </PaymentHistoryContainer>
//     </PaymentHistoryWrapper>
//   );
// }

// export default PaymentHistoryPage;
