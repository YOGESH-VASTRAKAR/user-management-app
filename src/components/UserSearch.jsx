// Import the useState hook from React for managing component state
import { useState } from "react";

// Import the getUsers function which retrieves all user data from localStorage
import { getUsers } from "../utilities/storage";

// Import the CSS styling specific to this component
import '../component-styles/UserSearch.css';

// Define the UserSearch component
const UserSearch = () => {
  // State to hold the search input (query typed by user)
  const [query, setQuery] = useState("");

  // State to hold the filtered user search results
  const [results, setResults] = useState([]);

  // Function to handle the search action
  const handleSearch = () => {
    // Retrieve all users from localStorage
    const users = getUsers();

    // Filter users based on whether their email includes the search query (case-insensitive)
    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(query.toLowerCase())
    );

    // Store the filtered results in state
    setResults(filtered);
  };

  return (
    <div className="user-search-container">
    <h2>User Search</h2>
    <input
      type="text"
      placeholder="Search by email"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <button onClick={handleSearch}>Search</button>

    {results.length > 0 ? (
      <ul>
        {results.map((user) => (
          <li key={user.email}>
            {user.fname} {user.lname} - {user.email}
          </li>
        ))}
      </ul>
    ) : (
      query && <p>No matching users found.</p>
    )}
  </div>
  );
};

export default UserSearch;
