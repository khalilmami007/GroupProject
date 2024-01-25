import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './components/style.css';
import DevRegister from './components/Register';
import Languages from './components/Languages';
import Frameworks from './components/Frameworks';
import DevLogin from './components/DevLogin';
// import OrgLogin from './components/OrgLogin';
// import OrgRegister from './components/OrgRegister';





function App() {
  const [devId,setDevId]=useState("")
  return (
    <div className="main">
     

            <Routes>
            <Route element={<DevRegister setDevId={setDevId}/>} path="/" default /> 
            <Route element={<Languages devId={devId} />} path="/devs/skills/languages"  /> 
            <Route element={<Frameworks devId={devId}/>} path="/devs/skills/frameworks"  /> 
            <Route element={<DevLogin/>} path="/devs/login"  /> 
            {/* <Route element={<OrgLogin/>} path="/orgs/login"  /> 
            <Route element={<OrgRegister/>} path="/orgs/register"  />  */}

             </Routes>
     
    </div>
  );
}

export default App;
