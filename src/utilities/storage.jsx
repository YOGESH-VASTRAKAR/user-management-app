// Define the key to be used for storing user data in localStorage
const STORAGE_KEY = "user_data";

// Fetch all users from localStorage
// If no users exist, return an empty array
export const getUsers = () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Save an array of users to localStorage
// Converts the array into a JSON string before saving
export const saveUsers = (users) => localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

// Add a new user to the existing users array
// 1. Fetch all current users
// 2. Push the new user into the array
// 3. Save the updated array back to localStorage
export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
};

// Update an existing user based on their email
// 1. Get all users
// 2. Replace the matched user with updated data
// 3. Save the updated users array
export const updateUser = (email, updates) => {
  let users = getUsers();                     // Step 1
  users = users.map(user => user.email === email ? { ...user, ...updates } : user);// Step 2: merge old and new data
  saveUsers(users);                           // Step 3
};

// Reset the password of a user identified by email
// Only updates the 'password' field
export const resetUserPassword = (email, newPassword) => {
  let users = getUsers();
  users = users.map(user =>
    user.email === email ? { ...user, password: newPassword } : user // Only password is updated
  );
  saveUsers(users);
};

// Find and return a single user by email
// Returns undefined if not found
export const getUserByEmail = (email) => getUsers().find(user => user.email === email);