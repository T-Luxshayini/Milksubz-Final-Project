// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';

// const SubscriptionPageWrapper = styled.div`
//   padding: 50px;
//   background-color: #f9f9f9;
//   min-height: 100vh;
// `;

// const Title = styled.h2`
//   font-size: 2.5em;
//   margin-bottom: 20px;
// `;

// const SubscriptionPlan = styled.div`
//   background-color: #fff;
//   border: 1px solid #ccc;
//   padding: 20px;
//   margin-bottom: 20px;
//   border-radius: 8px;
// `;

// const Button = styled.button`
//   background-color: #1e90ff;
//   color: white;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #ff4500;
//   }
// `;

// const Select = styled.select`
//   padding: 8px;
//   margin-right: 10px;
//   border-radius: 5px;
// `;

// const Input = styled.input`
//   padding: 8px;
//   margin-right: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   width: 50px;
// `;

// const SubscriptionPage = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [editingSubscriptionId, setEditingSubscriptionId] = useState(null);
//   const [selectedFrequency, setSelectedFrequency] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [status, setStatus] = useState('');

//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       const { data } = await axios.get('/api/subscriptions/my', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       setSubscriptions(data);
//     };
//     fetchSubscriptions();
//   }, []);

//   const handleEditClick = (id, currentFrequency, currentQuantity, currentStatus) => {
//     setEditingSubscriptionId(id);
//     setSelectedFrequency(currentFrequency);
//     setQuantity(currentQuantity);
//     setStatus(currentStatus);
//   };

//   const handleSubscriptionUpdate = async (id) => {
//     try {
//       await axios.put(`/api/subscriptions/${id}`, {
//         frequency: selectedFrequency,
//         quantity,
//         status,
//       }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });

//       setSubscriptions((prevSubscriptions) =>
//         prevSubscriptions.map((subscription) =>
//           subscription._id === id
//             ? { ...subscription, frequency: selectedFrequency, quantity, status }
//             : subscription
//         )
//       );
//       setEditingSubscriptionId(null);
//     } catch (error) {
//       console.error('Error updating subscription:', error);
//     }
//   };

//   const handleSubscribe = async (productId, frequency) => {
//     await axios.post('/api/subscriptions', { product: productId, frequency, quantity: 1, startDate: new Date() });
//     const { data } = await axios.get('/api/subscriptions/my');
//     setSubscriptions(data);
//   };

//   return (
//     <SubscriptionPageWrapper>
//       <Title>Subscription Plans</Title>
//       {subscriptions.length === 0 ? (
//         <p>No subscriptions yet. Subscribe to our products below!</p>
//       ) : (
//         subscriptions.map((subscription) => (
//           <SubscriptionPlan key={subscription._id}>
//             <h3>{subscription.product.name}</h3>
//             {editingSubscriptionId === subscription._id ? (
//               <>
//                 <Select value={selectedFrequency} onChange={(e) => setSelectedFrequency(e.target.value)}>
//                   <option value="daily">Daily</option>
//                   <option value="weekly">Weekly</option>
//                   <option value="monthly">Monthly</option>
//                 </Select>
//                 <Input
//                   type="number"
//                   value={quantity}
//                   min="1"
//                   onChange={(e) => setQuantity(e.target.value)}
//                 />
//                 <Select value={status} onChange={(e) => setStatus(e.target.value)}>
//                   <option value="active">Active</option>
//                   <option value="paused">Paused</option>
//                   <option value="cancelled">Cancelled</option>
//                 </Select>
//                 <Button onClick={() => handleSubscriptionUpdate(subscription._id)}>Save</Button>
//               </>
//             ) : (
//               <>
//                 <p>Frequency: {subscription.frequency}</p>
//                 <p>Quantity: {subscription.quantity}</p>
//                 <p>Status: {subscription.status}</p>
//                 <Button onClick={() => handleEditClick(subscription._id, subscription.frequency, subscription.quantity, subscription.status)}>
//                   Edit Subscription
//                 </Button>
//               </>
//             )}
//           </SubscriptionPlan>
//         ))
//       )}

//       <h2>Subscribe to Products</h2>
//       <div>
//         <h3>Fresh Milk - Rs 240</h3>
//         <Button onClick={() => handleSubscribe('product-id-1', 'weekly')}>Subscribe Weekly</Button>
//         <Button onClick={() => handleSubscribe('product-id-1', 'monthly')}>Subscribe Monthly</Button>
//       </div>
//     </SubscriptionPageWrapper>
//   );
// };

// export default SubscriptionPage;







// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Check, Milk } from "lucide-react"

// const plans = [
//   {
//     name: "Daily Moo Plan",
//     description: "Perfect for daily milk drinkers",
//     price: 39.99,
//     features: [
//       "4 liters of fresh whole milk weekly",
//       "Choice of glass bottles or eco-friendly cartons",
//       "Free delivery 7 days a week",
//       "Flexible delivery times",
//       "100% organic and locally sourced"
//     ]
//   },
//   {
//     name: "Family Dairy Delight",
//     description: "Ideal for milk-loving families",
//     price: 69.99,
//     features: [
//       "8 liters of fresh milk weekly (choice of whole, semi-skimmed, or skimmed)",
//       "2 liters of chocolate milk monthly",
//       "1 kg of artisanal cheese monthly",
//       "Priority morning delivery",
//       "Exclusive access to limited edition seasonal flavors"
//     ]
//   },
//   {
//     name: "Moo-nificent Bundle",
//     description: "The ultimate dairy experience",
//     price: 99.99,
//     features: [
//       "12 liters of fresh milk weekly (any variety)",
//       "4 liters of specialty milk (almond, oat, or soy) monthly",
//       "2 kg of premium cheese selection monthly",
//       "2 liters of farm-fresh cream monthly",
//       "VIP farm tours and tasting events"
//     ]
//   }
// ]

// export default function MilkSubscription() {
//   return (
//     <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         <header className="text-center mb-12">
//           <Milk className="w-16 h-16 mx-auto mb-4 text-primary" />
//           <h1 className="text-4xl font-bold mb-4">Fresh Milk, Delivered Daily</h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Subscribe to our premium milk delivery service and enjoy farm-fresh goodness at your doorstep every morning.
//           </p>
//         </header>

//         <div className="grid md:grid-cols-3 gap-8">
//           {plans.map((plan, index) => (
//             <Card key={index} className="flex flex-col">
//               <CardHeader>
//                 <CardTitle className="text-2xl">{plan.name}</CardTitle>
//                 <CardDescription>{plan.description}</CardDescription>
//               </CardHeader>
//               <CardContent className="flex-grow">
//                 <p className="text-3xl font-bold mb-4">${plan.price}<span className="text-sm font-normal">/month</span></p>
//                 <ul className="space-y-2">
//                   {plan.features.map((feature, featureIndex) => (
//                     <li key={featureIndex} className="flex items-start">
//                       <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </CardContent>
//               <CardFooter>
//                 <Button className="w-full">Subscribe Now</Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>

//         <div className="mt-16 text-center">
//           <h2 className="text-2xl font-bold mb-4">Why Choose Our Milk Subscription?</h2>
//           <div className="grid md:grid-cols-3 gap-8 mt-8">
//             {[
//               {
//                 title: "Farm Fresh Quality",
//                 description: "Our milk is sourced from local, ethical dairy farms and delivered within 24 hours of milking."
//               },
//               {
//                 title: "Flexible Options",
//                 description: "Choose from various milk types and easily pause or cancel your subscription anytime."
//               },
//               {
//                 title: "Eco-Friendly Packaging",
//                 description: "Reduce plastic waste with our bottle return program and eco-friendly packaging options."
//               }
//             ].map((item, index) => (
//               <div key={index} className="bg-white p-6 rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
//                 <p className="text-gray-600">{item.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         <footer className="mt-16 text-center text-gray-600">
//           <p>Join over 10,000 happy customers enjoying fresh, local milk every day.</p>
//           <p className="mt-2">Questions? Contact us at support@milksubscription.com</p>
//         </footer>
//       </div>
//     </div>
//   )
// }