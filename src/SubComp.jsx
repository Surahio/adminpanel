import React, { useState, useEffect } from "react";
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
import { invoke } from "@tauri-apps/api";




const SubComp = ({ onUpdate, onDelete, onAdd }) => {

  const [myArray, setMyArray] = useState([]);

  // Function to append an element to the array
  const appendElement = (x) => {
    setMyArray(prevArray => [...prevArray, x]);
  };



  const [mycheck, setmycheck] = useState("");

  const [newJson, setNewJson] = useState([
    {
      title: "",
      price: "",
      discount: "",
      currency: "",
      isdiscount: "",
      features: [],
      timespan: "",
    }
  ]);

  // useEffect(() => {
  //   invoke("showcase_x", {}).then((message1) => {
  //     invoke("showcase_sub", {}).then((message2) => {
  //       const json1 = JSON.parse(message1);
  //       const json2 = JSON.parse(message2);
  //       const j1 = json1.message;
  //       console.log("hi");
  //       const j2 = json2.message;
  //       const j3 = JSON.parse(j2);
  //       setVar(j1);
  //       setTson(j3);
  //     });
  //   });
  // }, []);
  

  // useEffect(() => {
  //   let j1, j2, j3; // Declare the variables in the outer scope
  
  //   invoke("showcase_x", {})
  //     .then((message1) => {
  //       const json1 = JSON.parse(message1);
  //       j1 = json1.message;
  
  //       // Process the data from showcase_x here
  
  //       return invoke("showcase_sub", {});
  //     })
  //     .then((message2) => {
  //       const json2 = JSON.parse(message2);
  //       j2 = json2.message;
  //       j3 = JSON.parse(j2);
  
  //       // Process the data from showcase_sub here
  //       // Execute the for loop based on j1 and j3
  
  //       for (let i = 0; i < j1.length; i++) {
  //         appendElement(j3[j1[i]]);
  //       }
  //     });
  // }, []);
  
  const [myJson, setmyJson] = useState("");

  const [newVar, setVar] = useState('');
  const [newTson, setTson] = useState('');
  let newArray;
  
  useEffect(() => {
    if (mycheck === "") {
      const fetchData = async () => {
        const message1 = await invoke("showcase_x", {});
        const json1 = JSON.parse(message1);
        const j1 = json1.message;
        //console.log(j1);
        setVar(j1);
        invoke("showcase_sub", {}).then((message2) => {
          const json2 = JSON.parse(message2);
          const j2 = json2.message;
          const j3 = JSON.parse(j2);
          //console.log(j3);
          setTson(j2);
  
          // Convert the JSON value to an array
          newArray = Object.values(j3);
          console.log(newArray);
  
          for (let i = 0; i < j1.length; i++) {
            appendElement(j3[j1[i]]);
          }
        });
      };
  
      fetchData();
      setmycheck("nope");
    }
  }, [mycheck]);
  
  
  
    

      const plans=myArray;
      // =  newJson;
      // const plans = [
      //   {
      //     title: "Basic Plan",
      //     price: "$10/month",
      //     features: ["1 GB Storage", "10 Users", "Email Support"],
      //   },
      //   {
      //     title: "Pro Plan",
      //     price: "$20/month",
      //     features: ["10 GB Storage", "100 Users", "Email + Phone Support"],
      //   },
      //   {
      //     title: "Enterprise Plan",
      //     price: "$50/month",
      //     features: [
      //       "100 GB Storage",
      //       "Unlimited Users",
      //       "24/7 Support ",
      //       "New element",
      //     ],
      //   },
      //   {
      //     title: "Basic Plan",
      //     price: "$10/month",
      //     features: ["1 GB Storage", "10 Users", "Email Support"],
      //   },
      //   {
      //     title: "Pro Plan",
      //     price: "$20/month",
      //     features: ["10 GB Storage", "100 Users", "Email + Phone Support"],
      //   },
      //   {
      //     title: "Enterprise Plan",
      //     price: "$50/month",
      //     features: [
      //       "100 GB Storage",
      //       "Unlimited Users",
      //       "24/7 Support ",
      //       "New element",
      //     ],
      //   },
      //   {
      //     title: "Basic Plan",
      //     price: "$10/month",
      //     features: ["1 GB Storage", "10 Users", "Email Support"],
      //   },
      //   {
      //     title: "Pro Plan",
      //     price: "$20/month",
      //     features: ["10 GB Storage", "100 Users", "Email + Phone Support"],
      //   },
      //   {
      //     title: "Enterprise Plan",
      //     price: "$50/month",
      //     features: [
      //       "100 GB Storage",
      //       "Unlimited Users",
      //       "24/7 Support ",
      //       "New element",
      //     ],
      //   },
      // ];
      
  const defaultPlan = {
    title: "",
    price: "",
    discount: "",
    currency: "USD",
    isdiscount: true,
    features: [],
    timespan: "Weekly",
  };

  const [newPlan, setNewPlan] = useState(defaultPlan);

  const [editIndex, setEditIndex] = useState(-1);

  
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleRefresh = () => {
    window.location.reload();
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
    const isModified = Object.keys(newPlan).some(
      (key) => newPlan[key] !== defaultPlan[key]
    );
  
    const finalPlan = {
      ...defaultPlan,
      ...(isModified && newPlan),
    };
  
    console.log(JSON.stringify(finalPlan));
  
    // Clear the form input fields
    setNewPlan(defaultPlan);
    setShowForm(false);

    // if (typeof onAdd === "function") {
    //   onAdd(newPlan);
    // }
    //console.log(JSON.stringify(newPlan));
    invoke("sub", {
      name: finalPlan.title,
      discount: finalPlan.discount,
      price: finalPlan.price,
      currency: finalPlan.currency,
      isDiscounted: finalPlan.isdiscount,
      feature: finalPlan.features,
      timespan: finalPlan.timespan
    });
  // Clear the form input fields
  // setNewPlan({
  //   title: "",
  //   price:"",
  //   discount:"",
  //   currency: "USD",
  //   isdiscount: "",
  //   features: [],
  //   timespan: "",
  // });
  //   setShowForm(false);
  };
  // useEffect(() => {
  //   console.log(newPlan);
  // }, [newPlan]);

  const handleTitleChange = (event) => {
    setNewPlan({ ...newPlan, title: event.target.value });
  };

  const handlePriceChange = (event) => {
    const enteredValue = event.target.value;
    const integerValue = parseInt(enteredValue);
  
    if (!isNaN(integerValue)) {
      setNewPlan({ ...newPlan, price: integerValue.toString() });
    } else {
      setNewPlan({ ...newPlan, price: "" });
    }
  };

  const handlediscount= (event) => {
    const enteredValue = event.target.value;
    const integerValue = parseInt(enteredValue);
    if (!isNaN(integerValue)) {
      setNewPlan({ ...newPlan, discount: integerValue.toString() });
    } else {
      setNewPlan({ ...newPlan, price: "" });
    }  
  };

  const handleCurrency = (event) => {
    setNewPlan((prevState) => ({
      ...prevState,
      currency: event.target.value,
    }));
    // console.log(newPlan);
  };

  const handleIsDiscount = (event) => {
    setNewPlan((prevState) => ({
      ...prevState,
      isdiscount: event.target.value,
    }));
    // console.log(newPlan);
  };

  const handleFeaturesChange = (event) => {
    setNewPlan({ ...newPlan, features: event.target.value.split("\n") });
  };

  const handleTimespan = (event) => {
    setNewPlan((prevState) => ({
      ...prevState,
      timespan: event.target.value,
    }));
    // console.log(newPlan);
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
                  <th>Currency</th>
                  <th>discount</th>
                  <th>Features</th>
                  <th>Timestamp</th>
                  <th>Action</th>
                </tr>

              

              {plans.map((plan, index) => (

  <tr key={index}>
    <th>
      {editIndex === index ? (
        <TextInput
          value={plan.name}
          onChange={(event) =>
            handleSave(index, { ...plan, name: event.target.value })
          }
        />
      ) : (
        plan.name
      )}
    </th>
    <th>
      {editIndex === index ? (
        <TextInput
        // type="number"
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
        <TextInput
        // type="number"
          value={plan.currency}
          onChange={(event) =>
            handleSave(index, { ...plan, currency: event.target.value })
          }
        />
      ) : (
        plan.currency
      )}
      
    </th>
    <th>
    {editIndex === index ? (
        <TextInput
        // type="number"
          value={plan.discount}
          onChange={(event) =>
            handleSave(index, { ...plan, discount: event.target.value })
          }
        />
      ) : (
        plan.discount
      )}
      
    </th><th>
    {editIndex === index ? (
        <TextInput
        // type="number"
          value={plan.features}
          onChange={(event) =>
            handleSave(index, { ...plan, features: event.target.value })
          }
        />
      ) : (
        plan.features
      )}
      
    </th><th>
    {editIndex === index ? (
        <TextInput
        // type="number"
          value={plan.timespan}
          onChange={(event) =>
            handleSave(index, { ...plan, timespan: event.target.value })
          }
        />
      ) : (
        plan.timespan
      )}
      
    </th>
    <th>
    <Button
                      onClick={() => handleDelete(index)}
                      
                    >
                      Delete
                    </Button>
                    </th>
  </tr>
))}
</Table>


</div>
<div class="button-container">
<Button className="add-btn"  onClick={handleAdd}>
  Add New Plan
</Button>
<Button className="add-btn"
onClick={()=>{
     invoke("remove_sub",{
      random:"406042",
     });
}}
>  
  check
</Button>
  </div>

</div>


{showForm && (
  <form>
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
    </div>
    <br></br>
    <div className="button-container">
        <Button  onClick={handleClose}>
          Close
        </Button>
        <Button  type="submit" onClick={()=>{
          handleSaveNewPlan();
          setTimeout(() => {
            handleRefresh();
          }, 3000);
          
          }}>
          Save
        </Button>
      </div>
  
  </form> 
)}
</div>
</div>
</>
);
};
export default SubComp;
