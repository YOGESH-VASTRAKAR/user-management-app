
// Import React useState hook for managing local component state
import { useState } from "react";

// Import utility to get user data by email from localStorage
import { getUserByEmail } from "../utilities/storage";

// Import CSS styling for login component
import '../component-styles/Login.css';

const Login = () => {
  // Local state to store input values and message feedback
  const [email, setEmail] = useState("");           // Email input
  const [password, setPassword] = useState("");     // Password input
  const [message, setMessage] = useState("");       // Feedback message to display

  // Handler for login form submission
  const handleLogin = (e) => {
    e.preventDefault();                 // Prevent default form refresh behavior

    const user = getUserByEmail(email); // Look up user by email

    // If no user is found
    if (!user) {
      setMessage("❌ User not found.");
      return;
    }

    // If the password does not match
    if (user.password !== password) {
      setMessage("❌ Incorrect password.");
      return;
    }

    // Successful login message
    setMessage(`✅ Welcome, ${user.fname} ${user.lname}!`);

    // Clear form inputs after successful login
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
    {message && <p>{message}</p>}
  </div>
  );
};

export default Login;
