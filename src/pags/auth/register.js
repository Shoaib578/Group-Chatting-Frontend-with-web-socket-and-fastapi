import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [email,setEmail] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/register', {
        username: username,
        password: password,
        email:email
      });
     
      setMessage(response.data.message);
    } catch (error) {
    
      setMessage(error.response.data.detail);
    }
  };

  return (
    <div className="container">
    <h2 className="mb-4">User Registration</h2>

    {message && (
      <div className="alert alert-warning mt-4" role="alert">
        {message}
      </div>
    )}
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <button type="submit" className="btn btn-warning">Register</button>
        <br />
        <br />

      <Link to={'/login'} >Already have an account?Login</Link>
    </form>
    
  </div>
  
  );
};

export default Register;
