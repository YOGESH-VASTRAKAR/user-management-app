// Import routing components from react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Import global styles for the app
import './App.css';

// Import all the component pages used in routing
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import UserSearch from "./components/UserSearch";

// Define the main App component
function App() {
  return (
    // Wrap everything inside Router to enable routing in the app
    <Router>
      <div className="container">
        {/* Navigation menu with links to different pages */}
        <nav>
          {/* Link components navigate to the respective paths without reloading the page */}
          <Link to="/" >Create User</Link>
          <Link to="/login" >Login</Link>
          <Link to="/reset" >Reset Password</Link>
          <Link to="/users" >User List</Link>
          <Link to="/search">Search</Link>
        </nav>

        {/* Define the routing structure of the application */}
        <Routes>
          {/* Route for the Create User page, shown at root path ("/") */}
          <Route path="/" element={<CreateUser />} />

          {/* Route for the Login page */}
          <Route path="/login" element={<Login />} />

          {/* Route for the Reset Password page */}
          <Route path="/reset" element={<ResetPassword />} />

          {/* Route for the User List page */}
          <Route path="/users" element={<UserList />} />

          {/* Route for the Edit User page using a dynamic email parameter */}
          <Route path="/edit/:email" element={<EditUser />} />

          {/* Route for the User Search page */}
          <Route path="/search" element={<UserSearch />} />
        </Routes>
      </div>
    </Router>
  );
}

// Export the App component to be used as the root component in index.js
export default App;