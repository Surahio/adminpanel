import "./Newuser.css";
import Sidebar from "./Sidebar.jsx";
import "./home.css";
import { userRows } from "./dummyData.js";
import { useState } from "react";

export default function NewUser() {
    const [users, setUsers] = useState(userRows);
    // const [myArray, _myArray] = useState([]);
    // const myObject = {
    //     _myArray: userRows,
        
    //     set myArray(newValue) {
    //       this._myArray = _myArray.concat(newValue);
    //     }
    //   };

    const handleSubmit = (event) => {
        event.preventDefault();
      
        // Get form data
        const formData = new FormData(event.target);
      
        // Convert form data to JSON string
        const jsonData = JSON.stringify(Object.fromEntries(formData));
      
        console.log(jsonData);
        event.target.reset();
      };
        

      

  return (
    <>
    <div className="container-new">
        <Sidebar />
          <div className="others">
          <div className="newUser">
          <span className="newUserTitle">New User</span>
              
              <form className="newUserForm" onSubmit={handleSubmit}>
                  <div className="newUserItem">
                      <label>Username</label>
                      <input type="text" placeholder="john" name="username"/>
                  </div>
                  <div className="newUserItem">
                      <label>Full Name</label>
                      <input type="text" placeholder="John Smith" name="fullName"/>
                  </div>
                  <div className="newUserItem">
                      <label>Email</label>
                      <input type="email" placeholder="john@gmail.com" name="email"/>
                  </div>
                  <div className="newUserItem">
                      <label>Password</label>
                      <input type="password" placeholder="password" name="password"/>
                  </div>
                  <div className="newUserItem">
                      <label>Phone</label>
                      <input type="text" placeholder="+1 123 456 78" name="phone"/>
                  </div>
                  <div className="newUserItem">
                      <label>Address</label>
                      <input type="text" placeholder="New York | USA" name="address"/>
                  </div>
                  <div className="newUserItem">
                      <label>Gender</label>
                      <div className="newUserGender">
                          <input type="radio" name="gender" id="male" value="male" />
                          <label htmlFor="male">Male</label>
                          <input type="radio" name="gender" id="female" value="female" />
                          <label htmlFor="female">Female</label>
                          <input type="radio" name="gender" id="other" value="other" />
                          <label htmlFor="other">Other</label>
                      </div>
                  </div>
                  <div className="newUserItem">
                      <label>Active</label>
                      <select className="newUserSelect" name="active" id="active">
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                      </select>
                  </div>
                  <button className="newUserButton" type="submit">Create</button>
              </form>
          </div>
          </div>
      </div>
    </>
  );
}
