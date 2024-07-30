// File path: /mnt/data/ListOfUsers.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ListOfUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const sessionKey = 'user_session_key';

  useEffect(() => {
    if (!sessionStorage.getItem(sessionKey)) {
      navigate('/login');
    } else {
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      setUsers(storedUsers);
    }
  }, [navigate, sessionKey]);

  function handleDeletion(index) {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); 
  }

  function handleEdit(index) {
    navigate(`/edit/${index}`); 
  }

  function handleAdd() {
    navigate('/register');
  }

  function handleLogout() {
    sessionStorage.removeItem(sessionKey);
    localStorage.removeItem('users'); // Assuming you want to clear users data as well
    navigate('/');
  }

  return (
    <div className="container">
      <header>
        <h1>List of Users</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <button onClick={handleAdd}>Add User</button>
      {users.length > 0 ? (
        <table className="users-table">
          <thead>
            <tr>
              <th className="table-header">Full Name</th>
              <th className="table-header">Username</th>
              <th className="table-header">Email</th>
              <th className="table-header">Phone</th>
              <th className="table-header">Gender</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="table-row">
                <td className="table-cell">{user.fullName}</td>
                <td className="table-cell">{user.username}</td>
                <td className="table-cell">{user.email}</td>
                <td className="table-cell">{user.telephone}</td>
                <td className="table-cell">{user.gender}</td>
                <td className="table-cell">
                  <button onClick={() => handleDeletion(index)}>Delete</button>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}
