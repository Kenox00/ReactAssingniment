import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterUser() {
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const telephoneRef = useRef(null);
  const genderRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    const fullName = fullNameRef.current.value;
    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    const telephone = telephoneRef.current.value;
    const gender = genderRef.current.value;
    const password = passwordRef.current.value;

    const newUser = { fullName, email, username, telephone, gender, password };
    let existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const existingUser = existingUsers.find(user => user.username === username);
    if (existingUser) {
      setErrorMessage('User already exists');
      return;
    }

    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('User is saved');
    navigate('/listOfUsers');

    fullNameRef.current.value = '';
    emailRef.current.value = '';
    usernameRef.current.value = '';
    telephoneRef.current.value = '';
    genderRef.current.value = '';
    passwordRef.current.value = '';
  };

  return (
    <form onSubmit={handleRegister}>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" id="fullName" ref={fullNameRef} placeholder="Full Name" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" ref={emailRef} placeholder="Email" required />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" ref={usernameRef} placeholder="Username" required />
      </div>
      <div>
        <label htmlFor="telephone">Telephone:</label>
        <input type="text" id="telephone" ref={telephoneRef} placeholder="Telephone" required />
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" ref={genderRef} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={passwordRef} placeholder="Password" required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
