// Import useState for managing form data and feedback
import { useState } from "react";

// Import utility functions to check if email exists and add new user
import { addUser, getUserByEmail } from "../utilities/storage";

// Import CSS for create user form
import '../component-styles/CreateUser.css';

const CreateUser = () => {
  // Form input state
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: ""
  });

  // Feedback message state
  const [message, setMessage] = useState("");

  // Handle input changes and update formData
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();       // Prevent page reload

    // Check if user with email already exists
    if (getUserByEmail(formData.email)) {
      setMessage("❌ Email already exists!");
      return;
    }

    // Add new user to storage
    addUser(formData);

    // Show success message  
    setMessage("✅ User created successfully!");

    // Clear the form after creation
    setFormData({
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: ""
    });
  };

  return (
    <div className="create-user-container">
    <h2>Create User</h2>
    <form onSubmit={handleSubmit}>
      <input name="fname" placeholder="First Name" value={formData.fname} onChange={handleChange} required />
      <input name="lname" placeholder="Last Name" value={formData.lname} onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
      <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required />
      <button type="submit">Create</button>
    </form>
    {message && <p>{message}</p>}
  </div>
  );
};

export default CreateUser;