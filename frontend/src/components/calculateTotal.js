const calculateTotal = (formData) => {
    const prices = { '1 week': 1400, '1 month': 5000, '3 months': 14000, '6 months': 26000, '1 year': 50000 };
    const milkPricePerLiter = 200;
    const totalLiters = formData.selectedDates.length * formData.quantity;
    return prices[formData.subscriptionPlan] + totalLiters * milkPricePerLiter;
  };
  
  export default calculateTotal;
  

// const calculateTotal = (formData) => {
//   const { selectedDates, subscriptionPlan, quantity } = formData;

//   // Ensure selectedDates is an array
//   const dates = Array.isArray(selectedDates) ? selectedDates : [];

//   // Calculate total based on the number of selected dates, subscription plan, and quantity
//   const dateCount = dates.length;
//   let planMultiplier = 1;

//   switch (subscriptionPlan) {
//     case '1 week':
//       planMultiplier = 1;
//       break;
//     case '1 month':
//       planMultiplier = 4;
//       break;
//     case '3 months':
//       planMultiplier = 12;
//       break;
//     default:
//       planMultiplier = 1;
//   }

//   const total = dateCount * planMultiplier * quantity * 10; // Example calculation
//   return total;
// };

// export default calculateTotal;