import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditUser() {
  const { index } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const sessionKey = 'user_session_key';

  useEffect(() => {
    if (!sessionStorage.getItem(sessionKey)) {
      navigate('/login'); 
    } else {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const userToEdit = storedUsers[parseInt(index, 10)];
      if (userToEdit) {
        setUser(userToEdit);
      } else {
        navigate('/');
      }
    }
  }, [navigate, sessionKey, index]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  function handleSave() {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    storedUsers[parseInt(index, 10)] = user;
    localStorage.setItem('users', JSON.stringify(storedUsers));
    navigate('/');
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>Edit User</h1>
      <form>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={user.fullName}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="telephone">Phone</label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            value={user.telephone}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={user.gender}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="button" onClick={handleSave} className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
