import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  let [address, setAddress] = useState("");


  const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch('https://medicareserver-git-main-akashs-projects-c96b2f8a.vercel.app/api/creatuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })

        });
        
    

        const json = await response.json()
        console.log(json);
        if (json.success) {
          // Save the auth token to local storage and redirect
          alert("User created successfully!");
        } else {
          // Handle unsuccessful response, e.g., display an error message
          alert("Failed to create user. Please check your inputs.");
        }
        
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

  return (
    <div style={{ backgroundImage: 'url("https://wallpaperaccess.com/full/7008236.jpg")', backgroundSize: 'cover',height: '100vh' }}>

        <div className='container' >
          <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
            <div className="m-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="m-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            </div>
            <div className="m-3">
              <label htmlFor="address" className="form-label">Address</label>
              <fieldset>
                <input type="text" className="form-control" name='address' placeholder='"Click below for fetching address"' value={address} onChange={(e)=>setAddress(e.target.value)} aria-describedby="emailHelp" />
              </fieldset>
            </div>
            
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
            </div>
            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
          </form>
        </div>
      </div>
  )
}
