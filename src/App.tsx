import { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  const [users, setUsers] = useState<Record<string, any>[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(3);

  // User logic

  const fetchUsers = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    setUsers(data);
  };

  const currentUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const filteredUsers = currentUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePrevClick = () => setCurrentPage((prev) => prev - 1);

  const handleNextClick = () => setCurrentPage((prev) => prev + 1);

  // Fetch -> user data

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h1>Users Table</h1>
      <label>Search: </label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 &&
            filteredUsers.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address.street}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={handlePrevClick} disabled={currentPage === 1}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextClick} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default App;
