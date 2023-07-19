import { User } from "../types";

interface Props {
  handleDelete: (email: string) => void;
  users: User[];
  rowsColored: boolean;
}

function UsersTable({ handleDelete, users, rowsColored }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Photo</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.email} className={rowsColored ? "rows" : ""}>
            <td>
              <img src={user.picture.thumbnail} />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button onClick={() => handleDelete(user.email)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsersTable;
