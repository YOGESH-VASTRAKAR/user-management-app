// Import React hooks
import { useEffect, useState } from "react";

// Import router utilities to get route parameters and redirect
import { useParams, useNavigate } from "react-router-dom";

// Import CSS styles
import '../component-styles/EditUser.css';

const EditUser = () => {
  const { email } = useParams(); // Get the user's email from the URL
  const navigate = useNavigate(); // Hook to redirect user after update

  // Local state for user data
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
  });

  // Fetch user data on component mount
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((u) => u.email === email);
    if (foundUser) {
      setUserData(foundUser);     // Set data in state if user is found
    }
  }, [email]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle form submission and update user
  const handleSubmit = (e) => {
    e.preventDefault();         // Prevent default form behavior

    // Get current list of users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Replace old user data with updated one
    const updatedUsers = users.map((user) =>
      user.email === email ? { ...user, ...userData } : user
    );

    // Save updated user list to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Alert user and navigate back to user list
    alert("User updated successfully!");
    navigate("/users");
  };

  return (
     <div className="edit-user-container">
    <h2>Edit User</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fname"
        placeholder="First Name"
        value={userData.fname}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="lname"
        placeholder="Last Name"
        value={userData.lname}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
        required
        readOnly
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={userData.phone}
        onChange={handleChange}
        required
      />
      <button type="submit">Update</button>
    </form>
  </div>
  );
};

export default EditUser;
