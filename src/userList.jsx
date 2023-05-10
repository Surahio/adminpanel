import React from 'react';
import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "./dummyData.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import  Sidebar  from "./Sidebar.jsx";
import "./home.css";

export default function Userlist() {

const [data, setData] = useState(userRows);

const handleDelete = (id) => {
  setData(data.filter((item) => item.id !== id));
};

const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    editable: true,
  },
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <>
        <Link to={{pathname: "/user/" + params.row.id, state: data}}>
        <button className="userListEdit">Edit</button>
        </Link>
        <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
        />
        </>
      );
    },
  },
];


  return (
    <div className="container-new">
      <Sidebar />
      <div className="others">
      <div className='userList'>
      <span className="datasetUpdateTitle">Users List</span>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
      </div>
    </div>
    
  )
}
