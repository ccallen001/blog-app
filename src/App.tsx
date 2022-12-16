import { useEffect, useState } from 'react';

import { Blog } from './types/Blog';

import './App.scss';

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const blogsResp = await fetch('/api/blogs');
        const blogsJson = await blogsResp.json();
        setBlogs(blogsJson);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="App">
      <h1>Blog List</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <a href={blog.url}>
              {blog.author} {blog.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
