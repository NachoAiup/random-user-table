import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import UsersTable from "./components/UsersTable";
import { User } from "./types";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortByCountry, setSortByCountry] = useState(false);
  const [rowsColored, setRowsColored] = useState(false);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const originalUsers = useRef<User[]>([]);

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then((res) => res.json())
      .then((dataFetched) => {
        setUsers(dataFetched.results);
        originalUsers.current = dataFetched.results;
      });
  }, []);

  const handleDelete = (email: string) => {
    const filteredRows = users.filter((user) => user.email !== email);
    setUsers(filteredRows);
  };

  const handleFilterByInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCountry(e.target.value);
  };

  const filteredUsers = useMemo(() => {
    return filterCountry
      ? users.filter((user) =>
          user.location.country
            .toLowerCase()
            .includes(filterCountry.toLocaleLowerCase())
        )
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    return sortByCountry
      ? [...filteredUsers].sort((a, b) => {
          return a.location.country.localeCompare(b.location.country);
        })
      : filteredUsers;
  }, [filteredUsers, sortByCountry]);

  return (
    <div className="App">
      <h2 className="title">User table</h2>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setRowsColored(!rowsColored)}>Color rows</button>
        <button onClick={() => setSortByCountry(!sortByCountry)}>
          Order by country
        </button>
        <button onClick={() => setUsers(originalUsers.current)}>
          Restore initial state
        </button>
        <input
          placeholder="Filter by country"
          onChange={(e) => handleFilterByInput(e)}
        />
      </div>
      <UsersTable
        handleDelete={handleDelete}
        users={sortedUsers}
        rowsColored={rowsColored}
      />
    </div>
  );
}

export default App;
