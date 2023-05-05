import React, { useState } from "react";
import "./style.css";
import {
  Container,
  Table,
  Button,
  Modal,
  TextInput,
  Textarea,
} from "@mantine/core";
import Sidebar from "./Sidebar.jsx";
import "./home.css";

const SubComp = ({ onUpdate, onDelete, onAdd }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const plans = [
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

  ];

  const [newPlan, setNewPlan] = useState({
    title: "",
    price: "",
    features: [],
  });
  const [showModal, setShowModal] = useState(false);

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
    setNewPlan({ title: "", price: "", features: [] });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSaveNewPlan = () => {
    if (typeof onAdd === "function") {
      onAdd(newPlan);
    }
    setShowModal(false);
  };

  const handleTitleChange = (event) => {
    setNewPlan({ ...newPlan, title: event.target.value });
  };

  const handlePriceChange = (event) => {
    setNewPlan({ ...newPlan, price: event.target.value });
  };

  const handleFeaturesChange = (event) => {
    setNewPlan({ ...newPlan, features: event.target.value.split("\n") });
  };

  return (
    <>
      <div className="container-new">
        <Sidebar />
        <div className="others">
          <div className="row">
            <a href="" target="_blank">
              <img
                src="/Logo_Ezhire.svg"
                className="logo tauri"
                alt="Tauri logo"
              />
            </a>
          </div>
          <Container>
            <Table className="sub-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Features</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {plans.map((plan, index) => (
                <tr key={index}>
                  <th>
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
                  </th>
                  <th>
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
                  </th>
                  <th>
                    {editIndex === index ? (
                      <Textarea
                        value={plan.features.join("\n")}
                        onChange={(e) =>
                          onUpdate(index, {
                            ...plan,
                            features: e.target.value.split("\n"),
                          })
                        }
                      />
                    ) : (
                      plan.features.map((feature, index) => (
                        <div key={index}>{feature}</div>
                      ))
                    )}
                  </th>
                  <th>
                    {editIndex === index ? (
                      <>
                        <Button
                          variant="outline"
                          color="blue"
                          size="xs"
                          onClick={() => handleSave(index, plan)}
                        >
                          Save
                        </Button>{" "}
                        <Button
                          variant="outline"
                          color="red"
                          size="xs"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          color="gray"
                     
                          size="xs"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          variant="outline"
                          color="red"
                          size="xs"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </th>
                </tr>
              ))}
            </Table>
            <Button
              style={{ marginTop: 20 }}
              onClick={handleAdd}
              variant="outline"
              color="blue"
            >
              Add new plan
            </Button>

            <Modal opened={showModal} onClose={handleClose} title="New Plan">
              <TextInput
                label="Title"
                placeholder="Enter title"
                value={newPlan.title}
                onChange={handleTitleChange}
              />
              <br />
              <TextInput
                label="Price"
                placeholder="Enter price"
                value={newPlan.price}
                onChange={handlePriceChange}
              />
              <br />
              <Textarea
                label="Features"
                placeholder="Enter features (one per line)"
                value={newPlan.features.join("\n")}
                onChange={handleFeaturesChange}
              />
              <br />
              <Button onClick={handleSaveNewPlan}>Save</Button>
            </Modal>
          </Container>
        </div>
      </div>
    </>
  );
};

export default SubComp;

// import React, { useState } from "react";
// import "./style.css";
// import { Container, Table, Button } from "@mantine/core";
// import Sidebar from "./Sidebar.jsx";
// import "./home.css";

// const SubComp = ({  onUpdate, onDelete, onAdd }) => {
//   const [editIndex, setEditIndex] = useState(-1);
//   const plans=[
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
//   const [newPlan, setNewPlan] = useState({ title: "", price: "", features: [] });

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
//     setEditIndex(plans.length);
//     if (typeof onAdd === 'function') {
//       onAdd(newPlan);
//     }
//     setNewPlan({ title: "", price: "", features: [] });
//   };

//   return (
//     <>
//     <div className="container-new">
//           <Sidebar/>
//           <div className="others">
//           <div className="row">
//       <a href="" target="_blank">
//         <img src="/Logo_Ezhire.svg" className="logo tauri" alt="Tauri logo" />
//       </a>
//     </div><Container>
//         <Table>
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Price</th>
//               <th>Features</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           {plans.map((plan, index) => (
//             <tr key={index}>
//               <th>
//                 {editIndex === index ? (
//                   <input
//                     type="text"
//                     value={plan.title}
//                     onChange={(e) => onUpdate(index, { ...plan, title: e.target.value })} />
//                 ) : (
//                   plan.title
//                 )}
//               </th>
//               <th>
//                 {editIndex === index ? (
//                   <input
//                     type="text"
//                     value={plan.price}
//                     onChange={(e) => onUpdate(index, { ...plan, price: e.target.value })} />
//                 ) : (
//                   plan.price
//                 )}
//               </th>
//               <th>
//                 {editIndex === index ? (
//                   <textarea
//                     value={plan.features.join("\n")}
//                     onChange={(e) => onUpdate(index, {
//                       ...plan,
//                       features: e.target.value.split("\n"),
//                     })} />
//                 ) : (
//                   plan.features.join(", ")
//                 )}
//               </th>
//               <th>
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
//               </th>
//             </tr>
//           ))}

//         </Table>
//         <Button onClick={handleAdd}>Add</Button>
//       </Container>
//           </div>
//     </div>
//     </>
//   );
// };

// export default SubComp;
