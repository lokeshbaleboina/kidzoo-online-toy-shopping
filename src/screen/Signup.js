import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'


export default function Signup() {
    const navigate = useNavigate();
    const [Credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" })

    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: Credentials.name, email: Credentials.email, password: Credentials.password, location: Credentials.location })

        })
        const json = await response.json()
        if (json.success) {
            // Store token and email just like login
            localStorage.setItem("authToken", json.authToken);
            localStorage.setItem("userEmail", json.email);

            navigate("/"); // auto-login and redirect to home
        } else {
            alert("User already exists or error occurred");
        }

    }
    const onChange = (event) => {
        setCredentials({ ...Credentials, [event.target.name]: event.target.value })
    }
    return (
        <div>
            <div className="container">
                <h2>🎠 Welcome to KidZoo!</h2>
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">👶Name</label>
                        <input type="text" className="form-control" name="name" value={Credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">📧Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={Credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">🔐Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={Credentials.password} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">🏠address</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" name="location" value={Credentials.location} onChange={onChange} />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">already a user?</Link>
                </form>
            </div>
        </div>
    )
}
