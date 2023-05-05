import './App.css';
import { useState } from "react";
import PricingPlan from "./PricingPlan.jsx";
import Loginpanel from './Loginpanel.jsx';
import Userlist from './Userlist.jsx';
import User from './User.jsx';
import Newuser from './Newuser.jsx';
import UserStatus from './UserStatus.jsx';
import Home from "./Home.js";
import {
  createStyles,
  Navbar,
  Group,
  Code,
  getStylesRef,
  rem,
} from "@mantine/core";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconHome,
  IconSubscript,
  IconDatabaseExport,
  IconPhoto,
  IconUserCircle,
} from "@tabler/icons-react";
import { MantineLogo } from "@mantine/ds";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SubComp from './SubComp';
import Sidebar from './Sidebar';

function App() {
  return (
    <BrowserRouter>

        <Routes>
          <Route path="" />
          <Route path="/subscription" element={<PricingPlan />} />
          <Route path="/panelsub" element={<SubComp />} />
          <Route path="/loginpanel" element={<Loginpanel />} />
          <Route path="/userlist" element={<Userlist />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newuser" element={<Newuser />} />
          <Route path="/UserStatus" element={<UserStatus />} />
          <Route path="/home" element={<Home />} />


          navigate(path);
        </Routes>
      </BrowserRouter>



  );
}
export default App;


