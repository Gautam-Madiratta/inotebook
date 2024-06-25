import './App.css';
import React,{useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState'
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

const [alert, setAlert]=useState(null);

const showAlert = (type,message) => {
      setAlert({
        alertType: type,
        message: message,
      })
      setTimeout(()=>{setAlert(null);},(1500))
}

const alerting = (parms)=> {
  const {type,message} = parms;
  showAlert(type,message)
}

  return (
   <>

  <NoteState>

   <Router>

   <Navbar></Navbar>
   <Alert alertDetails={alert}/>

   <Routes>
      <Route exact path="/" element= {<Home alert = {alerting}/> }/>
      <Route exact path="/about" element= {<About alert = {alerting}/>}/>
      <Route exact path="/login" element= {<Login alert = {alerting}/>}/>
      <Route exact path="/signup" element= {<Signup alert = {alerting}/>}/>

   </Routes>

   </Router>

  </NoteState>
   
  </>
   
  );
}

export default App;
