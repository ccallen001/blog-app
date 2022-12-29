import { useEffect, useState } from 'react';
import { Blog } from '../types/Blog';
import AddBlogForm from '../components/AddBlogForm';
import BlogListing from '../components/BlogListing';
import './styles/Blogs.scss';

export default function Blogs() {
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
    <div className="Blogs">
      <h1>Blog List</h1>
      <AddBlogForm blogs={blogs} setBlogs={setBlogs} />
      <ul>
        {blogs.map((blog) => (
          <BlogListing
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
          />
        ))}
      </ul>
    </div>
  );
}
