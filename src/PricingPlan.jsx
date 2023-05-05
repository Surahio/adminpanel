import App from "./App.js";
import "./style.css";
import { Container } from "@mantine/core";
import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import "./home.css";

const PricingPlan = () => {
  const [plans, setPlans] = useState([
    {
      title: "Basic Plan",
      price: "$10/month",
      features: ["1 GB Storage", "10 Users", "Email Support"],
    },
    {
      title: "Pro Plan",
      price: "$20/month",
      features: ["10 GB Storage", "100 Users", "Email + Phone Support"],
    },
    {
      title: "Enterprise Plan",
      price: "$50/month",
      features: [
        "100 GB Storage",
        "Unlimited Users",
        "24/7 Support ",
        "New element",
      ],
    },
  ]);

  const addPlan = () => {
    setPlans([
      ...plans,
      {
        title: "New Plan",
        price: "$25/month",
        features: ["2 GB Storage", "20 Users", "Email Support"],
      },
    ]);
  };

  const removePlan = (index) => {
    const newPlans = [...plans];
    newPlans.splice(index, 1);
    setPlans(newPlans);
  };
  

  const PlanCard = ({ title, price, features, index }) => {
    return (
      
      <div>
          <Container height={700} width={300} p="md"></Container>

          <div className="plan-card">
            <h2>{title}</h2>
            <p className="price">{price}</p>
            <ul className="features">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button onClick={() => removePlan(index)}>Remove Plan</button>
          </div>
        </div>
    );
  };

  return (
    <>
      <div className="container-new">
        <Sidebar />
        <div className="others">
        <Container>
        <div className="row">
          <a href="" target="_blank">
            <img
              src="/Logo_Ezhire.svg"
              className="logo tauri"
              alt="Tauri logo"
            />
          </a>
        </div>
      </Container>
      <div className="price-plan">
        {plans.map((plan, index) => (
          <PlanCard key={index} {...plan} index={index} />
        ))}
        <button onClick={addPlan}>Add Plan</button>
      </div>
        </div>
      </div>
    </>
  );
};

export default PricingPlan;



// import App from "./App.js";
// import "./style.css";
// import { Container } from "@mantine/core";
// import React from "react";

// const PricingPlan = () => {
//   const plans = [
//     {
//       title: "Basic Plan",
//       price: "$10/month",
//       features: ["1 GB Storage", "10 Users", "Email Support"],
//     },
//     {
//       title: "Basic Plan",
//       price: "$10/month",
//       features: ["1 GB Storage", "10 Users", "Email Support"],
//     },
//     {
//       title: "Basic Plan",
//       price: "$10/month",
//       features: ["1 GB Storage", "10 Users", "Email Support"],
//     },
//     {
//       title: "Basic Plan",
//       price: "$10/month",
//       features: ["1 GB Storage", "10 Users", "Email Support"],
//     },
//     {
//       title: "Basic Plan",
//       price: "$10/month",
//       features: ["1 GB Storage", "10 Users", "Email Support"],
//     },
//     {
//       title: "Pro Plan",
//       price: "$20/month",
//       features: ["10 GB Storage", "100 Users", "Email + Phone Support"],
//     },
//     {
//       title: "Enterprise Plan",
//       price: "$50/month",
//       features: [
//         "100 GB Storage",
//         "Unlimited Users",
//         "24/7 Support ",
//         "New element",
//       ],
//     },
//   ];

//   const PlanCard = ({ title, price, features }) => {
//     return (
//       <div>
//         <Container height={700} width={300} p="md"></Container>

//         <div className="plan-card">
//           <h2>{title}</h2>
//           <p className="price">{price}</p>
//           <ul className="features">
//             {features.map((feature, index) => (
//               <li key={index}>{feature}</li>
//             ))}
//           </ul>
//           <button>Select Plan</button>
//         </div>
//       </div>
//     );
//   };
  
//   return (
//     <>
//       <Container>
//         <div className="row">
//           <a href="" target="_blank">
//             <img
//               src="/Logo_Ezhire.svg"
//               className="logo tauri"
//               alt="Tauri logo"
//             />
//           </a>
//         </div>
//       </Container>
//       <div className="price-plan">
//         {plans.map((plan, index) => (
//           <PlanCard key={index} {...plan} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default PricingPlan;
