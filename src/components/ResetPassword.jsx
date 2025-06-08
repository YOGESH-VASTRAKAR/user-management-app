// Import React useState hook
import { useState } from "react";

// Import utility functions to get and update user data
import { getUserByEmail, updateUser } from "../utilities/storage";

// Import CSS for styling this component
import '../component-styles/ResetPassword.css';

const ResetPassword = () => {

  // States to hold form inputs and feedback message
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleReset = (e) => {
    e.preventDefault();       // Prevent page reload

    const user = getUserByEmail(email);   // Get user from localStorage by email

    // If user doesn't exist
    if (!user) {
      setMessage("❌ User not found.");
      return;
    }

    // If old password does not match current one
    if (user.password !== oldPassword) {
      setMessage("❌ Old password does not match.");
      return;
    }
    
    // Update user's password and save
    updateUser(email, { ...user, password: newPassword });

    // Show success message and reset inputs
    setMessage("✅ Password reset successfully!");
    setEmail("");
    setOldPassword("");
    setNewPassword("");
  };

  return (
     <div className="reset-password-container">
    <h2>Reset Password</h2>
    <form onSubmit={handleReset}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        required
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        required
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button type="submit">Reset Password</button>
    </form>
    {message && <p>{message}</p>}
  </div>
  );
};

export default ResetPassword;