import { useEffect, useState, FormEvent } from 'react';
import { handleResponseError } from '../helpers/handle-response-error';
import './styles/Users.scss';

export default function Users() {
  const [users, setUsers] = useState<{ id: string; username: string }[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const usersResp = await fetch('/api/users');
        const usersJson = await usersResp.json();
        setUsers(usersJson);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    const target = ev.target;
    // @ts-ignore
    const [{ value: username }, { value: password }, { value: name }] = target;
    // @ts-ignore
    target.reset();

    const res = await fetch('api/users/', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${sessionStorage.getItem('token') || ''}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        name
      })
    });
    const resJson = await res.json();
    const error = resJson.error;

    if (error) return handleResponseError(error);

    setUsers(users.concat(resJson));
  }

  return (
    <div className="Users">
      <h1>Users</h1>
      <form onSubmit={handleSubmit}>
        <h4>Add User</h4>
        <input placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input placeholder="Name" />
        <input type="submit" value="Submit" />
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
