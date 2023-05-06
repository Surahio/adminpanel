import React, { useState } from "react";
import "./style.css";
import {
  Container,
  Table,
  Button,
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
  const [showForm, setShowForm] = useState(false);

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
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleSaveNewPlan = () => {
    if (typeof onAdd === "function") {
      onAdd(newPlan);
    }
    setShowForm(false);
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
          <div className="window">
            <div className="Data-set">
          <Table className="sub-table">
             
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Features</th>
                  <th>Actions</th>
                </tr>

              

              {plans.map((plan, index) => (

  <tr key={index}>
    <th>
      {editIndex === index ? (
        <TextInput
          value={plan.title}
          onChange={(event) =>
            handleSave(index, { ...plan, title: event.target.value })
          }
        />
      ) : (
        plan.title
      )}
    </th>
    <th>
      {editIndex === index ? (
        <TextInput
          value={plan.price}
          onChange={(event) =>
            handleSave(index, { ...plan, price: event.target.value })
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
          onChange={(event) =>
            handleSave(index, {
              ...plan,
              features: event.target.value.split("\n"),
            })
          }
        />
      ) : (
        plan.features.join(", ")
      )}
    </th>
    <th>
      {editIndex === index ? (
        <>
          <Button
            variant="light"
            onClick={() => handleSave(index, plan)}
            style={{ marginRight: "8px" }}
          >
            Save
          </Button>
          <Button variant="light" onClick={handleCancel}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="light"
            onClick={() => handleEdit(index)}
            style={{ marginRight: "8px" }}
          >
            Edit
          </Button>
          <Button
            variant="light"
            onClick={() => handleDelete(index)}
            style={{ marginRight: "8px" }}
          >
            Delete
          </Button>
        </>
      )}
    </th>
  </tr>
))}
</Table>

</div>
<Button variant="light" onClick={handleAdd}>
  Add New Plan
</Button>
</div>


{showForm && (
  <div className="form-overlay">
    <div className="form-container">
      <h2>Add New Plan</h2>
      <TextInput
        label="Title"
        value={newPlan.title}
        onChange={handleTitleChange}
      />
      <TextInput
        label="Price"
        value={newPlan.price}
        onChange={handlePriceChange}
      />
      <Textarea
        label="Features"
        placeholder="Enter one feature per line"
        value={newPlan.features.join("\n")}
        onChange={handleFeaturesChange}
      />
      <div className="button-container">
        <Button variant="light" onClick={handleClose}>
          Close
        </Button>
        <Button variant="light" onClick={handleSaveNewPlan}>
          Save
        </Button>
      </div>
    </div>
  </div>
)}
</div>
</div>
</>
);
};
export default SubComp;
