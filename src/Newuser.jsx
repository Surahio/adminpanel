import { useState } from "react";
import React from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import "./style.css";
// import { Button } from "./Components/Button";
import { useNavigate } from "react-router-dom";
import  Sidebar  from "./Sidebar.jsx";
import { userRows } from "./dummyData.js";

export default function NewUser() {
    // const [users, setUsers] = useState(userRows);
    // const [greetMsg, setGreetMsg] = useState("");
    const [emailID, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [cpassowrd, setCPassword] = useState("");
    // const [VCode, setVCode] = useState("");
    // const [response, setResponse] = useState("");
    // //const [Remember, setRememberMe] = useState(false);
    // const [T, setT] = useState(false);
    // const [title, setTitle] = useState("Registration");
    const [message, setMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [matchError, setMatchError] = useState("");
    const [RegBtnDisable, setRegBtnDisable]= useState(false);
    const [isAdmin, setIsAdmin] = useState({
        admin: "no",
    });
    // const [myArray, _myArray] = useState([]);
    // const myObject = {
    //     _myArray: userRows,
        
    //     set myArray(newValue) {
    //       this._myArray = _myArray.concat(newValue);
    //     }
    //   };

    const emailValidation = () => {
        const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regEx.test(emailID)) {
          setMessage("");
        } else if (!regEx.test(emailID)) {
          setMessage("Email is not valid");
        } else {
          setMessage("");
        }
      };
    
      function validatePass() {
        if (password.length < 8) {
          setPasswordError("Password must be at least 8 characters long.");
        } else {
          setPasswordError("");
        }
      }
    
      function ComparePass() {
        if (cpassowrd != password) {
          setMatchError("Passwords do not match!");
        } else {
          setMatchError("");
        }
      }

      const handleIsAdmin = (event) => {
        setIsAdmin((prevState) => ({
          ...prevState,
          admin: event.target.value,
        }));
      };
  return (
    <>
    <div className="container-new">
        <Sidebar />
          <div className="others">
          <div className="newUser">
          <span className="newUserTitle">New User</span>
              
              <form className="newUserForm" onSubmit={(e) => {e.preventDefault();}}>
                  {/* <div className="newUserItem">
                      <label>Username</label>
                      <input type="text" placeholder="john" name="username"/>
                  </div> */}
                    <React.Fragment> 
                  <div className="newUserItem">
                      <label>Full Name</label>
                      <input type="text" placeholder="Enter Name" onChange={(e) => setName(e.currentTarget.value)}/>
                  </div>
                  <div className="newUserItem">
                      <label>Email</label>
                      <input type="email" placeholder="Email ID"  onChange={(e) => setEmail(e.currentTarget.value)}/>
                  </div>
                  <div className="newUserItem">
                      <label>Password</label>
                      <input type="Password" placeholder="password"  onChange={(e) => setPassword(e.currentTarget.value)}/>
                  </div>
                  <div className="newUserItem">
                      <label>Confirm Password</label>
                      <input type="Confirm Password" placeholder="Confirm Password" onChange={(e) => setCPassword(e.currentTarget.value)}/>
                  </div>
                  {/* <div className="newUserItem">
                      <label>Address</label>
                      <input type="text" placeholder="New York | USA" name="address"/>
                  </div> */}
                  {/* <div className="newUserItem">
                      <label>Gender</label>
                      <div className="newUserGender">
                          <input type="radio" name="gender" id="male" value="male" />
                          <label htmlFor="male">Male</label>
                          <input type="radio" name="gender" id="female" value="female" />
                          <label htmlFor="female">Female</label>
                          <input type="radio" name="gender" id="other" value="other" />
                          <label htmlFor="other">Other</label>
                      </div>
                  </div> */}
                                <div className="newUserItem">
  <label>Is Admin?</label>
  <select
    className="newUserSelect"
    name="isAdmin"
    label="isAdmin"
    value={isAdmin.admin}
    onChange={handleIsAdmin}
  >
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>
</div>
                  <button className="newUserButton" type="submit" disabled={RegBtnDisable}
                  onClick={() => {
                    console.log("Button Clicked")
                    setRegBtnDisable(true);
                    ComparePass();
                    validatePass();
                    emailValidation();
                    console.log(isAdmin);
                    invoke("create_user", {
                      email: emailID,
                      name: name,
                      password: password,
                      admin : isAdmin.admin,
                    })
                    
                    // .then((message) => {
                    //   setResponse(message);
                    //   console.log(message);
                    //   var x = JSON.parse(message);
                    //   setGreetMsg(x.response);
                    //   console.log(x.value);
                    //   setT(x.value);
                    //   console.log("Toggle = ", T);
                    //   setTitle("Verify Email");
                    // });
                    setRegBtnDisable(false);
                  }}> Create </button>
                </React.Fragment> 
              </form>
          </div>
          </div>
      </div>
    </>
  );
}
