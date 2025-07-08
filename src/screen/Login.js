import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [Credentials, setCredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: Credentials.email, password: Credentials.password })

    })
    const json = await response.json()
    console.log(json)
    if (!json.success) {
      alert("enter valid credentials")
    }
    if (json.success) {
      localStorage.setItem("userEmail",Credentials.email);

      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }


  }
  const onChange = (event) => {
    setCredentials({ ...Credentials, [event.target.name]: event.target.value })
  }
  return (
    <div>
      <div className="container">
        <form onSubmit={handlesubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={Credentials.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={Credentials.password} onChange={onChange} />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/createuser" className="m-3 btn btn-danger">New User?</Link>
        </form>
      </div>
    </div>

  )
}
