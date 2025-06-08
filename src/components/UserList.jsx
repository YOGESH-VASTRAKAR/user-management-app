// Import React hooks
import { useEffect, useState } from "react";

// Import utility functions to interact with localStorage
import {
  getUsers,             // Gets all users
  updateUser,           // Updates a user
  resetUserPassword,    // Resets a user's password
} from "../utilities/storage";

// Import styling for this component
import '../component-styles/UserList.css';

// Functional component definition
const UserList = () => {
  // State to hold all users
  const [users, setUsers] = useState([]);

  // State to hold user currently being edited
  const [editUser, setEditUser] = useState(null);

  // State to temporarily store new passwords for each user
  const [passwords, setPasswords] = useState({});

  // useEffect hook runs once on component mount
  useEffect(() => {
    // Load users from localStorage and set them in state
    setUsers(getUsers());
  }, []);

  // Handle input changes when editing a user
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    
    // Update the field (fname, lname, phone) of the user being edited
    setEditUser({ ...editUser, [name]: value });
  };

  // Save edited user data back to localStorage
  const saveUser = () => {
    updateUser(editUser.email, editUser);  // Save updated user
    setUsers(getUsers());                  // Refresh local users state
    setEditUser(null);                     // Close the edit section
  };

  // Handle password input changes per user (keyed by email)
  const handlePasswordChange = (email, value) => {
    setPasswords((prev) => ({ ...prev, [email]: value }));
  };

  // Reset the password for the given user
  const resetPassword = (email) => {
    const newPassword = passwords[email]; // Get new password from state

    if (!newPassword) {
      alert("Enter new password");
      return;
    }

    // Call utility to reset password in storage
    resetUserPassword(email, newPassword);

    // Clear password field after reset
    setPasswords((prev) => ({ ...prev, [email]: "" }));

    alert("Password reset successfully!");
  };

  return (
    <div className="user-list-container">
      <h2>User List</h2>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Edit</th>
              <th>Reset Password</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.email}>
                <td data-label="Email">{u.email}</td>
                <td data-label="Name">{u.fname} {u.lname}</td>
                <td data-label="Phone">{u.phone}</td>
                <td>
                  <button onClick={() => setEditUser({ ...u })}>Edit</button>
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="New password"
                    value={passwords[u.email] || ""}
                    onChange={(e) => handlePasswordChange(u.email, e.target.value)}
                  />
                  <button onClick={() => resetPassword(u.email)}>Reset</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editUser && (
        <div className="edit-section">
          <h3>Edit User: {editUser.email}</h3>
          <input
            type="text"
            name="fname"
            value={editUser.fname}
            onChange={handleEditChange}
            placeholder="First Name"
          />
          <input
            type="text"
            name="lname"
            value={editUser.lname}
            onChange={handleEditChange}
            placeholder="Last Name"
          />
          <input
            type="text"
            name="phone"
            value={editUser.phone}
            onChange={handleEditChange}
            placeholder="Phone"
          />
          <button onClick={saveUser}>Save</button>
        </div>
      )}
    </div>
  );
};

export default UserList;
