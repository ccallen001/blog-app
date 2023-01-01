import { FormEvent } from 'react';
import { loginErrorMessage } from '../messages/errors';
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

      const resp = await fetch('/api/login', {
        method: 'POST',
        headers: {
          Authorization: `bearer ${sessionStorage.getItem('token') || ''}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const respJson = await resp.json();

      if (resp.status !== 200) throw Error(respJson.message);

      const { name, username: uName, token } = respJson;

      sessionStorage.setItem('token', token)

      alert(`Hi, ${name}! You are successfully logged in as "${uName}".`);
    } catch (err) {
      alert(loginErrorMessage);
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
