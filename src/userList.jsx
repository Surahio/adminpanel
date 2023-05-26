import React, { useState, useEffect } from "react";
import "./userList.css";
import "./style.css";
import {
  Container,
  Table,
  Button,
  TextInput,
  Textarea,
} from "@mantine/core";
import "./home.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "./dummyData.js";
import { Link } from "react-router-dom";
// import { useState } from "react";
import  Sidebar  from "./Sidebar.jsx";
import "./home.css";
import { invoke } from "@tauri-apps/api";


export default function Userlist() {

const [myArray, setMyArray] = useState([]);

const [data, setData] = useState(myArray);

const [mycheck, setmycheck] = useState("");

const [newVar, setVar] = useState([]);
const [newTson, setTson] = useState('');

  // Function to append an element to the array
  const appendElement = (j3) => {
    setMyArray(prevArray => [...prevArray, j3]);
  };

  let newArray;
  let j3;

  useEffect(() => {
    if (mycheck === "") {
      invoke("user_list",{
      }).then((message)=>{
        const json1 = JSON.parse(message);
        const j1 = json1.message;
        // const j2 = JSON.parse(j1);
        console.log(j1);
        setVar(j1);
        // appendElement(j2);
      });
      invoke("hasher",{
      }).then((message)=>{
        const json2 = JSON.parse(message);
        const j3 = json2.message;
        console.log(j3);
        setTson(j3);
      });
      for (let i = 0; i < newTson.length; i++) {
        appendElement(newVar[newTson[i]]);
      }
    }

  }, [mycheck]);


const handleDelete = (id) => {
  setData(data.filter((item) => item.id !== id));
};

const [editIndex, setEditIndex] = useState(-1);

const plans = myArray;
  // { field: 'id', headerName: 'ID', width: 200 },
  // {
  //   field: 'name',
  //   headerName: 'Name',
  //   width: 200,
  //   editable: true,
  // },
  // {
  //   field: 'email',
  //   headerName: 'Email',
  //   width: 200,
  //   editable: true,
  // },
  // {
  //   field: 'status',
  //   headerName: 'Status',
  //   width: 200,
  //   editable: true,
  // },
  // {
  //   field: "action",
  //   headerName: "Action",
  //   width: 150,
  //   renderCell: (params) => {
  //     return (
  //       <>
  //       <Link to={{pathname: "/user/" + params.row.id, state: data}}>
  //       <button className="userListEdit">Edit</button>
  //       </Link>
  //       <DeleteOutline
  //             className="userListDelete"
  //             onClick={() => handleDelete(params.row.id)}
  //       />
  //       </>
  //     );
  //   },
  // },



  return (
    <div className="container-new">
      <Sidebar />
      <div className="others">
      <div className='userList'>
      <span className="datasetUpdateTitle">Users List</span>
      
      <Table className="sub-table">
             
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>

              

              {plans.map((plan, index) => (

  <tr key={index}>
    <th>
      {editIndex === index ? (
        <TextInput
          value={plan.name}
          
        />
      ) : (
        plan.name
      )}
    </th>
    <th>
      {editIndex === index ? (
        <TextInput
        // type="number"
          value={plan.email}
          
        />
      ) : (
        plan.email
      )}
    </th>
    <th>
    {editIndex === index ? (
        <TextInput
        // type="number"
          value={plan.isAdmin}
          
        />
      ) : (
        plan.Admin
      )}
      
    </th>
   
    
  </tr>
))}
</Table>




    </div>
      </div>
      <button  type="button" onClick={()=>{
          console.log(myArray);
          }}>
          Save
        </button>
    </div>
    
  )
}
