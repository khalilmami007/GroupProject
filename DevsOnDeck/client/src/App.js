import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './components/style.css';
import Register from './components/Register';
import Languages from './components/Languages';
import Frameworks from './components/Frameworks';
import DevLogin from './components/DevLogin';
import AvailabeJobs from './components/AvailableJobs';
import Login from './components/Login';
import OrgRegister from './components/OrgRegister';
import Dashboard from './components/Dashboard';
import Newposiotion from './components/Newposition';
import PositionDetails from './components/PositionDetails';





function App() {
  const [devId,setDevId]=useState("")
  return (
    <div className="main">
     

            <Routes>
            <Route element={<Register setDevId={setDevId}/>} path="/" default /> 
            <Route element={<Languages devId={devId} />} path="/devs/skills/languages"  /> 
            <Route element={<Frameworks devId={devId}/>} path="/devs/skills/frameworks/:id"  /> 
            <Route element={<DevLogin/>} path="/devs/login"  /> 
            <Route element={<AvailabeJobs/>} path="/devs/jobs"  /> 
            <Route path='/orgs/Register' element={<OrgRegister />} />
            <Route path='/orgs/Dashboard' element={<Dashboard />} />
            <Route path='/orgs/Login' element={<Login />} />
            <Route path='/orgs/jobs/new' element={<Newposiotion/> } />
            <Route path="/orgs/jobs/:positionId" element={<PositionDetails />} />

            {/* <Route element={<OrgLogin/>} path="/orgs/login"  /> 
            <Route element={<OrgRegister/>} path="/orgs/register"  />  */}

             </Routes>
     
    </div>
  );
}

export default App;
