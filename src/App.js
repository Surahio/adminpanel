
import './App.css';
import adminpanel from "./adminpanel.jsx";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    
<div className={"App"}>
<h2>  pewdipie</h2>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<adminpanel />} />
          navigate(path);
        </Routes>
      </BrowserRouter>
    </div>

)}
export default App;

