import React, { useState, useEffect } from "react";
import "./UserInfo.css"; // Import the custom CSS file

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ userID: "", username: "", password: "", role: "" });
  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/users");
      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleDeleteUser = async (userID) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`http://localhost:5000/user/users/${userID}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete user");

      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditUser = (user) => {
    setFormData({ userID: user.userID, username: user.username, role: user.role, password: "" });
    setEditing(true);
    setShowForm(true);
  };

  const handleAddUser = async () => {
    if (!formData.username || !formData.password || !formData.role) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to add user");

      fetchUsers();
      setFormData({ username: "", password: "", role: "" });
      setEditing(false);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateUser = async () => {
    if (!formData.username || !formData.role) {
      setError("Username and role are required!");
      return;
    }

    const updatedData = { username: formData.username, role: formData.role };
    
    // Include password in the update request only if it's not empty
    if (formData.password) {
      updatedData.password = formData.password;
    }

    try {
      const response = await fetch(`http://localhost:5000/user/users/${formData.userID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to update user");

      fetchUsers();
      setFormData({ username: "", password: "", role: "" });
      setEditing(false);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="user-list-card">
        {/* User List Title */}
        <h2 className="title">User List</h2>

        {/* Search Box */}
        <input
          type="text"
          className="search-box"
          placeholder="Search by username or role"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* Scrollable Table */}
        <div className="table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th className="table-header">Username</th>
                <th className="table-header">Role</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.userID}>
                  <td className="table-cell">{user.username}</td>
                  <td className="table-cell">{user.role}</td>
                  <td className="table-cell actions">
                    <button
                      className="edit-button"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteUser(user.userID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add User Button */}
        <button
          className="add-user-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add User"}
        </button>

        {/* User Form (Hidden until Button is Clicked) */}
        {showForm && (
          <div className="form-container">
            <h2 className="form-title">
              {editing ? "Update User" : "Add User"}
            </h2>

            {error && <p className="error-message">{error}</p>}

            <form>
              <input
                type="text"
                className="input-field"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
              {editing && (
                <input
                  type="password"
                  className="input-field"
                  placeholder="Password (Leave empty to keep current)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              )}
              <select
                className="input-field"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="">Select Role</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>

              <button
                type="button"
                className="submit-button"
                onClick={editing ? handleUpdateUser : handleAddUser}
              >
                {editing ? "Update User" : "Add User"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
