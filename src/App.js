
import './App.css';
import { useState } from "react";
import PricingPlan from "./PricingPlan.jsx";
import Loginpanel from './Loginpanel.jsx';
import UserList from './Userlist';
import User from './User';

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

function App() {
  return (
    <div className={"App"}>
      <BrowserRouter>
      
        <Routes>
          <Route path="" element={<PricingPlan />} />
          <Route path="/subscription" element={<PricingPlan />} />
          <Route path="/panelsub" element={<SubComp />} />
          <Route path="/loginpanel" element={<Loginpanel />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          navigate(path);
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;




// import './App.css';
// import PricingPlan from './PricingPlan';
// import { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// function App() {
//   return (
// <div className={"App"}>
// <h2>  pewdipie</h2>
//       <BrowserRouter>
//         <Routes>
//           <Route path=" " element={<PricingPlan />} />
//           navigate(path);
//         </Routes>               
//       </BrowserRouter>
//     </div>

// )}
// export default App;

