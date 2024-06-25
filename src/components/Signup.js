import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {

  const navigate = useNavigate();

  const [credentials,setCredentials]= useState({name:"",email:"",password:"",cpassword:""});

  const onSubmit= async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        }, body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
      });
      const json = await response.json()
      console.log(json)
     
      if(json.success){
        localStorage.setItem('token',json.authtoken)
        navigate("/");
        props.alert({type:"success",message:"Logged In Successfully"})
      }
      else{
        props.alert({type:"danger",message:"Please Enter Valid Credentails"})
      }
}

  const onchange = (ev) =>{
    setCredentials({...credentials,[ev.target.name] : ev.target.value})
  }

  return (
    <div className="container">

    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
         Name
        </label>
        <input
          type="text"
          name="name"
          value={credentials.name}
          className="form-control"
          id="name"
          aria-describedby="emailHelp"
          onChange={onchange}
          minLength={3}
          />
        </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          value={credentials.email}
          name="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          onChange={onchange}
          required
          />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          value={credentials.password}
          name="password"
          className="form-control"
          id="password"
          onChange={onchange}
          minLength={5}
          required
          />
      </div>

      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          value={credentials.cpassword}
          name="cpassword"
          className="form-control"
          id="cpassword"
          onChange={onchange}
          />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
    </div>
  );
}
