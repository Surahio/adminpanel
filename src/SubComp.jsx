import React, { useState } from "react";
  import { Container, Table, Button } from "@mantine/core";



const SubComp = ({  onUpdate, onDelete, onAdd }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const plans=[ 
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
    },];
  const [newPlan, setNewPlan] = useState({ title: "", price: "", features: [] });

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleSave = (index, updatedPlan) => {
    onUpdate(index, updatedPlan);
    setEditIndex(-1);
  };

  const handleCancel = () => {
    setEditIndex(-1);
  };

  const handleDelete = (index) => {
    onDelete(index);
  };

  const handleAdd = () => {
    setEditIndex(plans.length);
    if (typeof onAdd === 'function') {
      onAdd(newPlan);
    }
    setNewPlan({ title: "", price: "", features: [] });
  };

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Features</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={plan.title}
                    onChange={(e) =>
                      onUpdate(index, { ...plan, title: e.target.value })
                    }
                  />
                ) : (
                  plan.title
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={plan.price}
                    onChange={(e) =>
                      onUpdate(index, { ...plan, price: e.target.value })
                    }
                  />
                ) : (
                  plan.price
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <textarea
                    value={plan.features.join("\n")}
                    onChange={(e) =>
                      onUpdate(index, {
                        ...plan,
                        features: e.target.value.split("\n"),
                      })
                    }
                  />
                ) : (
                  plan.features.join(", ")
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <>
                    <Button onClick={() => handleSave(index, plan)}>Save</Button>{" "}
                    <Button onClick={handleCancel}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEdit(index)}>Edit</Button>{" "}
                    <Button onClick={() => handleDelete(index)}>Delete</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={handleAdd}>Add</Button>
    </Container>
  );
};

export default SubComp;


// import React, { useState } from "react";
// import { Container, Table, Button } from "@mantine/core";

// const SubComp = ({ plans = [], onUpdate, onDelete, onAdd }) => {
//   const [editIndex, setEditIndex] = useState(-1);

//   const handleEdit = (index) => {
//     setEditIndex(index);
//   };

//   const handleSave = (index, updatedPlan) => {
//     onUpdate(index, updatedPlan);
//     setEditIndex(-1);
//   };

//   const handleCancel = () => {
//     setEditIndex(-1);
//   };

//   const handleDelete = (index) => {
//     onDelete(index);
//   };
//   const handleAdd = () => {
//     setNewPlan({ title: "", price: "", features: [] });
//     setEditIndex(plans.length);
//   };

//   return (
//     <Container>
//       <Table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Price</th>
//             <th>Features</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {plans.map((plan, index) => (
//             <tr key={index}>
//               <td>
//                 {editIndex === index ? (
//                   <input
//                     type="text"
//                     value={plan.title}
//                     onChange={(e) =>
//                       onUpdate(index, { ...plan, title: e.target.value })
//                     }
//                   />
//                 ) : (
//                   plan.title
//                 )}
//               </td>
//               <td>
//                 {editIndex === index ? (
//                   <input
//                     type="text"
//                     value={plan.price}
//                     onChange={(e) =>
//                       onUpdate(index, { ...plan, price: e.target.value })
//                     }
//                   />
//                 ) : (
//                   plan.price
//                 )}
//               </td>
//               <td>
//                 {editIndex === index ? (
//                   <textarea
//                     value={plan.features.join("\n")}
//                     onChange={(e) =>
//                       onUpdate(index, {
//                         ...plan,
//                         features: e.target.value.split("\n"),
//                       })
//                     }
//                   />
//                 ) : (
//                   plan.features.join(", ")
//                 )}
//               </td>
//               <td>
//                 {editIndex === index ? (
//                   <>
//                     <Button onClick={() => handleSave(index, plan)}>Save</Button>{" "}
//                     <Button onClick={handleCancel}>Cancel</Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button onClick={() => handleEdit(index)}>Edit</Button>{" "}
//                     <Button onClick={() => handleDelete(index)}>Delete</Button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <Button onClick={handleAdd}>Add</Button>
//     </Container>
//   );
// };

// export default SubComp;
/*b2*/

// import React, { useState } from "react";
// import { Container, Table, Button } from "@mantine/core";

// const SubComp = ({ plans=[ ], onUpdate, onDelete }) => {
//   const [editIndex, setEditIndex] = useState(-1);

//   const handleEdit = (index) => {
//     setEditIndex(index);
//   };

//   const handleSave = (index, updatedPlan) => {
//     onUpdate(index, updatedPlan);
//     setEditIndex(-1);
//   };

//   const handleCancel = () => {
//     setEditIndex(-1);
//   };

//   const handleDelete = (index) => {
//     onDelete(index);
//   };

//   return (
//     <Container>
//       <Table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Price</th>
//             <th>Features</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {plans.map((plan, index) => (
//             <tr key={index}>
//               <td>
//                 {editIndex === index ? (
//                   <input
//                     type="text"
//                     value={plan.title}
//                     onChange={(e) =>
//                       onUpdate(index, { ...plan, title: e.target.value })
//                     }
//                   />
//                 ) : (
//                   plan.title
//                 )}
//               </td>
//               <td>
//                 {editIndex === index ? (
//                   <input
//                     type="text"
//                     value={plan.price}
//                     onChange={(e) =>
//                       onUpdate(index, { ...plan, price: e.target.value })
//                     }
//                   />
//                 ) : (
//                   plan.price
//                 )}
//               </td>
//               <td>
//                 {editIndex === index ? (
//                   <textarea
//                     value={plan.features.join("\n")}
//                     onChange={(e) =>
//                       onUpdate(index, {
//                         ...plan,
//                         features: e.target.value.split("\n"),
//                       })
//                     }
//                   />
//                 ) : (
//                   plan.features.join(", ")
//                 )}
//               </td>
//               <td>
//                 {editIndex === index ? (
//                   <>
//                     <Button onClick={() => handleSave(index, plan)}>Save</Button>{" "}
//                     <Button onClick={handleCancel}>Cancel</Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button onClick={() => handleEdit(index)}>Edit</Button>{" "}
//                     <Button onClick={() => handleDelete(index)}>Delete</Button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default SubComp;
