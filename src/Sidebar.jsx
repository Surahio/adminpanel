import React from 'react';
import "./Sidebar.css";
import { LineStyle, Notifications, Publish, Payment, Storage, AttachMoney, Settings, ExitToApp} from '@material-ui/icons';
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className='sidebar'>
        <div className = 'top'>
        <img
            style={{ paddingLeft: "15px" }}
            margin-left="auto"
            width="150px"
            height="75px"
            src="Logo_Ezhire.svg"
            className="logo react"
            alt="Tauri logo"
          />
        </div>
        <div className='sidebarwrapper'>
            <div className="sidebarmenu">
                <h3 className="sidebartitle">Dashboard</h3>
                <ul className="sidebarlist">
                    <Link to="/home" className="link" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <li className="sidebarlistitem">
                        <LineStyle className='sidebaricon'/>
                        Home
                    </li>
                    </Link>
                    <li className="sidebarlistitem">
                        <Notifications className='sidebaricon'/>
                        Notifications
                    </li>
                </ul>
            </div>
            <div className="sidebarmenu">
                <h3 className="sidebartitle">Users</h3>
                <ul className="sidebarlist">
                    <Link to="/userlist" className="link" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <li className="sidebarlistitem">
                        <Storage className='sidebaricon'/>
                        All Users
                    </li>
                    </Link>
                    <Link to="/newuser" className="link" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <li className="sidebarlistitem">
                        <Publish className='sidebaricon'/>
                        Add User
                    </li>
                    </Link>
                </ul>
            </div>
            <div className="sidebarmenu">
                <h3 className="sidebartitle">Subscription</h3>
                <ul className="sidebarlist">
                    <Link to="/panelsub" className="link" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <li className="sidebarlistitem">
                        <AttachMoney className='sidebaricon'/>
                        Edit Pricing Plan
                    </li>
                    </Link>
                    <Link to="/payment-form" className="link" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <li className="sidebarlistitem">
                        <Payment className='sidebaricon'/>
                        Edit Payment Form
                    </li>
                    </Link>
                </ul>
            </div>
            <div className="sidebarmenu">
                <h3 className="sidebartitle">Settings</h3>
                <ul className="sidebarlist">
                    <Link to="/settings" className="link" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <li className="sidebarlistitem">
                        <Settings className='sidebaricon'/>
                        Settings
                    </li>
                    </Link>
                </ul>
            </div>
            <div className="sidebarmenu">
                <h3 className="sidebartitle">Logout</h3>
                <ul className="sidebarlist">
                    <Link to="/loginpanel" className="link" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <li className="sidebarlistitem">
                        <ExitToApp className='sidebaricon' />
                        Logout
                    </li>
                    </Link>
                </ul>
            </div>
        </div>
    </div>
  )
}


