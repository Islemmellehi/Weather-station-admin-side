import React, { useEffect, useState } from "react";
import "./UsersTable.css";

function UsersTable() {
  const [users, setUsers] = useState([]); // State to store all users
  const [displayedUsers, setDisplayedUsers] = useState([]); // State to store currently displayed users
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [page, setPage] = useState(0); // Page number for pagination (starting at 0)

  const usersPerPage = 5; // Number of users to display at a time

  // State to handle form inputs
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
  });

  // Fetch users from the database
  useEffect(() => {
    fetchUsers();
 
  }, []); 

  // Function to fetch users
  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:5001/api/users"); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      console.log("Fetched users:", data); // Debug log to ensure data is fetched properly
      setUsers(data); // Update state with all user data
      setDisplayedUsers(data.slice(0, usersPerPage)); // Display only the first 5 users initially
    } catch (err) {
      setError(err.message); // Handle errors
    } finally {
      setLoading(false); // Stop loading
    }
  }

  // Function to handle user deletion
  async function handleDelete(username) {
    try {
      const response = await fetch(`http://localhost:5001/api/users/${username}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove the deleted user from the state
      setUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));
      setDisplayedUsers((prevUsers) => prevUsers.filter((user) => user.username !== username)); // Update displayed users
    } catch (err) {
      console.error("Error deleting user:", err.message);
    }
  }

  // Function to load more users (replace the displayed users with the next 5)
  function loadMoreUsers() {
    const nextPage = page + 1; // Move to the next page
    const start = nextPage * usersPerPage; // Calculate the start index of the next page
    const end = start + usersPerPage; // Calculate the end index for the slice

    // Check if we have more users to load
    if (start < users.length) {
      const newUsers = users.slice(start, end); // Get the next batch of users
      console.log("New users to load:", newUsers); // Debug log to see the new users being added

      setDisplayedUsers(newUsers); // Replace displayed users with new users
      setPage(nextPage); // Increment the page number
    } else {
      console.log("No more users to load"); // Debug log to check if we're at the end
    }
  }

  // Function to load previous users (replace the displayed users with the previous 5)
  function loadPreviousUsers() {
    const prevPage = page - 1; // Move to the previous page
    const start = prevPage * usersPerPage; // Calculate the start index of the previous page
    const end = start + usersPerPage; // Calculate the end index for the slice

    // Ensure we don't go before the first page
    if (start >= 0) {
      const newUsers = users.slice(start, end); // Get the previous batch of users
      console.log("Previous users to load:", newUsers); // Debug log to see the previous users being added

      setDisplayedUsers(newUsers); // Replace displayed users with new users
      setPage(prevPage); // Decrement the page number
    } else {
      console.log("No previous users to load"); // Debug log to check if we're at the start
    }
  }

  // Handle input changes in the form
  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  // Handle form submission to add a new user
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    if (!newUser.username || !newUser.password) {
      alert("Please provide both username and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const addedUser = await response.json();
      console.log("Added user:", addedUser); // Debug log to confirm user was added

      // Update the users list with the newly added user
      setUsers((prevUsers) => [addedUser, ...prevUsers]);
      setDisplayedUsers((prevUsers) => [addedUser, ...prevUsers.slice(0, usersPerPage - 1)]); // Add to the displayed users

      // Clear the form inputs
      setNewUser({ username: "", password: "" });
    } catch (err) {
      console.error("Error adding user:", err.message);
    }
  }

  if (loading) return <div>Loading...</div>; // Show a loading message
  if (error) return <div>Error: {error}</div>; // Show an error message if fetching fails

  return (
    <div>
      <h1>User Management</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th id="actions-hd">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.length > 0 ? (
            displayedUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td id="actions-id">
                  <button onClick={() => handleDelete(user.username)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Show the 'Show More' button only if there are more users to load */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        {page > 0 && (
          <button id="prev" onClick={loadPreviousUsers}>
            Show Previous
          </button>
        )}
        {users.length > displayedUsers.length && (
          <button id="more" onClick={loadMoreUsers}>
            Show More
          </button>
        )}
      </div>

      {/* Add New User Form */}
      <div>
        <h2 id="adduser">Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
            placeholder="Type username"
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
            placeholder="Type password"

              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
}

export default UsersTable;
