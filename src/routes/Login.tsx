import { FormEvent } from 'react';
import './styles/Login.scss';

export default function Login() {
  async function handleSubmit(ev: FormEvent) {
    try {
      ev.preventDefault();

      const target = ev.target;
      // @ts-ignore
      const [{ value: username }, { value: password }] = target;
      // @ts-ignore
      target.reset();

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const jsonResponse = await response.json();

      if (response.status !== 200) throw Error(jsonResponse.message);

      const { name, username: uName } = jsonResponse;

      alert(`Hello, ${name}! You are successfully logged in as "${uName}".`);
      console.log(jsonResponse);
    } catch (err) {
      alert('There was an error logging in. Please try again.');
      console.error(err);
    }
  }

  return (
    <div className="Login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <h4>Log In</h4>
        <input placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
