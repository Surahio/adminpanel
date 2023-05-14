import React from 'react';
import "./User.css";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import  Sidebar  from "./Sidebar.jsx";
import "./home.css";
import { userRows } from "./dummyData.js";
import { useState } from "react";

export default function User() {

  const [data, setData] = useState(userRows);
  const url = window.location.href;
  const index = parseInt(url.substring(url.lastIndexOf('/') + 1));
  //const user = userRows.filter(user => user.id === index)[0];

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const user = data[index - 1];

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (index !== -1) {
      const updatedUser = {
        ...user,
        name,
        username,
        email,
        contact,
        location,
      };
  
      const newData = [...data];
      newData[index - 1] = updatedUser;
      setData(newData);
    }

    const formData = new FormData(e.target);
      
        // Convert form data to JSON string
        const jsonData = JSON.stringify(Object.fromEntries(formData));
      
        console.log(jsonData);
        e.target.reset();
  
    setName("");
    setUsername("");
    setEmail("");
    setContact("");
    setLocation("");
  };
  


  return (
    <>
    <div className="container-new">
    <Sidebar />
      <div className="others">
      <div classname="User">
        <div className="userTitleContainer">
          <h1 className="UserTitle">Edit User</h1>
          <Link to="/newUser">
            <button className="userAddButton">Create</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img src="" alt="" className="userShowImg" />
              <div className="userShowTopTitle">
              <span className='userShowUsername'>{user.name}</span>
                <span className="userShowUserTitle">{user.title}</span>
              </div>
            </div>
            <div className="userShowButton">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user.username}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{user.dob}</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{user.contact}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">{user.location}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            
            <form className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem" >
                  <label htmlFor="username">UserName:</label>
                  <input
                    type="text"
                    placeholder="annabeck99"
                    className="userUpdateInput"
                    name="username"
                    value={username} onChange={(e) => setUsername(e.target.value)}
                    
                  />
                </div>
                <div className="userUpdateItem">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    placeholder="Anna Becker"
                    className="userUpdateInput" 
                    name="name"
                    value={name} onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="userUpdateItem">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    placeholder="annabeck99@gmail.com"
                    className="userUpdateInput" 
                    name="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="userUpdateItem">
                  <label htmlFor="contact">Phone</label>
                  <input
                    type="text"
                    placeholder="+9232134314"
                    className="userUpdateInput" 
                    name="contact"
                    value={contact} onChange={(e) => setContact(e.target.value)}
                    />
                </div>
                <div className="userUpdateItem">
                  <label htmlFor="location">Address</label>
                  <input
                    type="text"
                    placeholder="New York | USA"
                    className="userUpdateInput" 
                    name="location"
                    value={location} onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src=""
                    alt="" />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton" type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}
