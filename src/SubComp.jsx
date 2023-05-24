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
    price:"",
    discount:"",
    currency: "USD",
    isdiscount: "True",
    features: [],
    timespan: "Monthly",
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
    console.log(JSON.stringify(newPlan));

  // Clear the form input fields
  setNewPlan({
    title: "",
    price: "",
    discount: "",
    currency: "",
    isdiscount: "",
    features: [],
    timespan: "",
  });
    setShowForm(false);
  };

  const handleTitleChange = (event) => {
    setNewPlan({ ...newPlan, title: event.target.value });
  };

  const handlePriceChange = (event) => {
    setNewPlan({ ...newPlan, price: event.target.value });
  };

  const handlediscount= (event) => {
    setNewPlan({ ...newPlan, discount: event.target.value });
  };

  const handleCurrency = (event) => {
    setNewPlan((prevState) => ({
      ...prevState,
      currency: event.target.value,
    }));
  };

  const handleIsDiscount = (event) => {
    setNewPlan((prevState) => ({
      ...prevState,
      isdiscount: event.target.value,
    }));
  };

  const handleFeaturesChange = (event) => {
    setNewPlan({ ...newPlan, features: event.target.value.split("\n") });
  };

  const handleTimespan = (event) => {
    setNewPlan((prevState) => ({
      ...prevState,
      timespan: event.target.value,
    }));
  };

  /*const handleSubmit = (event) => {
    event.preventDefault();
  
    // Create a new FormData object
    const formData = new FormData(event.target);
  
    // Create an empty object to store the form values
    const formValues = {};
  
    // Iterate over the FormData entries and assign them to the formValues object
    for (let [name, value] of formData.entries()) {
      formValues[name] = value;
    }
  
    // Convert formValues object to JSON string
    const jsonData = JSON.stringify(formValues);
  
    console.log(jsonData);
    event.target.reset();
  };*/
  

 

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
        type="number"
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
  <form > 
  <div className="form-overlay">
    <div className="form-container">
      <h2>Add New Plan</h2>
      <TextInput
        name="title"
        label="Title"
        value={newPlan.title}
        onChange={handleTitleChange}
      />
      <TextInput
        name="price"
        label="Price"
        value={newPlan.price}
        onChange={handlePriceChange}
      />
      <label>Currency</label>
      <select 
        label="Currency"
        value={newPlan.currency}
        onChange={handleCurrency}
      >
        <option value="USD">USD</option>
        <option value="PKR">PKR</option>
        <option value="RUB">RUB</option>
      </select>
      <TextInput
        name="discount"
        label="Discount"
        value={newPlan.discount}
        onChange={handlediscount}
      />
      <label>Is Discount?</label>
      <select 
        name="isdiscount"
        label="isDiscount"
        value={newPlan.isdiscount}
        onChange={handleIsDiscount}
      >
        <option value="True">True</option>
        <option value="False">False</option>
      </select>
      <Textarea
        name="features"
        label="Features"
        placeholder="Enter features seperated by commma(,)"
        value={newPlan.features.join("\n")}
        onChange={handleFeaturesChange}
      />
      <label>Timespan</label>
      <select 
        name="timespan"
        label="TimeSpan"
        value={newPlan.timespan}
        onChange={handleTimespan}
      >
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </select>
      
    </div>
    <div className="button-container">
        <Button variant="light" onClick={handleClose}>
          Close
        </Button>
        <Button variant="light" type="submit" onClick={handleSaveNewPlan}>
          Save
        </Button>
      </div>
  </div>
  </form>
)}
</div>
</div>
</>
);
};
export default SubComp;
