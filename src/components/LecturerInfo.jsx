import React, { useState } from 'react';

const UserInfo = () => {
  // Dummy user data
  const [users, setUsers] = useState([
    { userID: 1, username: 'admin', passwordHash: 'adminhash', role: 'admin' },
    { userID: 2, username: 'john.smith', passwordHash: 'johnhash', role: 'lecturer' },
    { userID: 3, username: 'jane.doe', passwordHash: 'janedoehash', role: 'lecturer' },
  ]);

  const [filteredUsers, setFilteredUsers] = useState(users); // State to hold the filtered users
  const [formData, setFormData] = useState({ userID: '', username: '', passwordHash: '', role: '' });
  const [editing, setEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search input

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddOrUpdateUser = () => {
    if (editing) {
      // Update existing user
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userID === formData.userID ? { ...user, ...formData } : user
        )
      );
    } else {
      // Add new user
      const newUser = { ...formData, userID: Date.now() }; // Using Date.now() for unique userID
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }

    setFormData({ userID: '', username: '', passwordHash: '', role: '' });
    setEditing(false);
  };

  const handleEditUser = (user) => {
    setFormData({ ...user });
    setEditing(true);
  };

  const handleDeleteUser = (userID) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.userID !== userID));
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter users based on the search query (by username or role)
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.role.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <div style={styles.container}>
      <h2>{editing ? 'Update User' : 'Add User'}</h2>
      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="password"
          name="passwordHash"
          placeholder="Password Hash"
          value={formData.passwordHash}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          name="role"
          placeholder="Role (admin/lecturer)"
          value={formData.role}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button type="button" onClick={handleAddOrUpdateUser} style={styles.button}>
          {editing ? 'Update User' : 'Add User'}
        </button>
      </form>

      {/* Search input */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by username or role"
          value={searchQuery}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
      </div>

      <h2>User Information</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.userID}>
              <td style={styles.td}>{user.username}</td>
              <td style={styles.td}>{user.role}</td>
              <td style={styles.actionsCell}>
                <button onClick={() => handleEditUser(user)} style={styles.editButton}>
                  Edit
                </button>
                <button onClick={() => handleDeleteUser(user.userID)} style={styles.deleteButton}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#ff9800',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  actionsCell: {
    textAlign: 'center', // Centers the action buttons in the table cell
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    padding: '10px',
    backgroundColor: '#2d3b4e',
    color: 'white',
    border: '1px solid #ddd', // Add border to header cells
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd', // Add border to data cells
  },
  searchContainer: {
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '20px',
  },
};

export default UserInfo;
