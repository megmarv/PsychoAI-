import React, { useState, useEffect } from "react";

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ username: "", password: "", role: "" });
  const [editing, setEditing] = useState(false);

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
    // 🛑 Show confirmation before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return; // Stop if user cancels

    try {
      const response = await fetch(`http://localhost:5000/user/users/${userID}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete user");

      fetchUsers(); // Refresh the list after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditUser = (user) => {
    setFormData({ userID: user.userID, username: user.username, role: user.role });
    setEditing(true);
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
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to add user");

      fetchUsers(); // Refresh user list after adding
      setFormData({ username: "", password: "", role: "" });
      setEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/user/users/${formData.userID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: formData.username, role: formData.role }),
      });

      if (!response.ok) throw new Error("Failed to update user");

      fetchUsers(); // Refresh the list after updating
      setFormData({ username: "", password: "", role: "" });
      setEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app-container">
      <div className="container">
        <h2>{editing ? "Update User" : "Add User"}</h2>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          {!editing && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          )}
          <input
            type="text"
            name="role"
            placeholder="Role (admin/teacher)"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
          />
          <button type="button" onClick={editing ? handleUpdateUser : handleAddUser}>
            {editing ? "Update User" : "Add User"}
          </button>
        </form>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by username or role"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.userID}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEditUser(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.userID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInfo;
