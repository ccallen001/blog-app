import { useEffect, useState, FormEvent } from 'react';
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
    const [{ value: username }, { value: password }, { value: name }] =
      target;
    // @ts-ignore
    target.reset();

    const result = await fetch('api/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        name
      })
    });
    const jsonResult = await result.json();
    
    setUsers(users.concat(jsonResult));
  }

  return (
    <div className='Users'>
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
