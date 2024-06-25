import React, {useState} from "react";
import {useNavigate } from "react-router-dom";

export default function Login(props) {

const [credentials , setCredentials] = useState({email:"",password:""});
let navigate = useNavigate();

    const onSubmit= async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
            }, body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json = await response.json()
          console.log(json)
          if(json.success){
            localStorage.setItem('token',json.authtoken)
            navigate("/");
            props.alert({type:"success",message:"Account Created Successfully"})
          }
          else{
            props.alert({type:"danger",message:"Please Enter Valid Credentails"})
          }
    }

    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value })
      }

  return (
    <div className="container my-4" >
      <h2>Login To INotebook</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3" >
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onchange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            value={credentials.password}
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
