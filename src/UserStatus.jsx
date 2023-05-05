import React, { useState } from 'react';
import "./style.css";
import Sidebar from "./Sidebar.jsx";
import "./home.css";

function UserStatus() {
  const [status, setStatus] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

const handleIdChange = (event) => {
    setUserId(event.target.value);
 };

  const handleBlock = () => {
    setIsBlocked(true);
    setStatus('blocked');
  };

  const handleUnblock = () => {
    setIsBlocked(false);
    setStatus('active');
  };

  const handleCheckStatus = () => {
    // for now check on dummy dat but haf to add function for db
    const users = [
      { id: '1', name: 'John Doe', status: 'active' },
      { id: '2', name: 'Jane Smith', status: 'blocked' },
      { id: '3', name: 'Bob Johnson', status: 'active' },
    ];
    const user = users.find((user) => user.id === userId);
    if (user) {
      setUserName(user.name);
      setStatus(user.status);
      setIsBlocked(user.status === 'blocked');
    } else {
      setUserName('');
      setStatus('');
      setIsBlocked(false);
    }
  };

  return (
    <>
    <div className="container-new">
          <Sidebar/>
          <div className="others">
          <div className="row">
          <a href="" target="_blank">
              <img src="/Logo_Ezhire.svg" className="logo tauri" alt="Tauri logo" />
          </a>
      </div><div className='status'>
              <label htmlFor="user-id">User ID</label>
              <br></br>
              <input type="text" id="user-id" value={userId} onChange={handleIdChange} />
              <br></br>
              <button onClick={handleCheckStatus}>Check Status</button>
              {status && (
                  <div>
                      <p>User name: {userName}</p>
                      <p>User status: {status}</p>
                      <p>User is {isBlocked ? 'blocked' : 'unblocked'}</p>
                      {!isBlocked ? (
                          <button onClick={handleBlock}>Block User</button>
                      ) : (
                          <button onClick={handleUnblock}>Unblock User</button>
                      )}
                  </div>
              )}
          </div>
          </div>
    </div>
    </>
  );
}

export default UserStatus;