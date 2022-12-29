import { FormEvent, useEffect, useState } from 'react';
import { Blog } from '../types/Blog';
import { User } from '../types/User';
import './styles/AddBlogForm.scss';

interface IProps {
  blogs: Blog[];
  setBlogs: Function;
}

export default function AddBlogForm({ blogs, setBlogs }: IProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const usersResp = await fetch('/api/users');
        const usersJson = await usersResp.json();
        setUsers(usersJson);
        setUserId(usersJson[0].id);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const form: EventTarget = ev.target;
    // @ts-ignore
    const [
      { value: title },
      { value: author },
      { value: url },
      { value: likes }
    ] = form;
    // @ts-ignore
    form.reset();

    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        author,
        url,
        likes,
        userId
      })
    });
    const addedBlog = await response.json();

    setBlogs(blogs.concat(addedBlog));
  }

  return (
    <div className="AddBlogForm">
      <form onSubmit={handleSubmit}>
        <h4>Add Blog</h4>
        <input placeholder="Title" />
        <input placeholder="Author" />
        <input placeholder="Url" />
        <input placeholder="Likes" />
        <input type="submit" value="Submit" />
      </form>

      <div>
        <label>User:</label>&nbsp;
        <select
          onInput={(ev) => setUserId((ev.target as HTMLInputElement).value)}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}