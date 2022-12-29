import { Blog } from '../types/Blog';
import './styles/BlogListing.scss';

interface IProps {
  blog: Blog;
  blogs: Blog[];
  setBlogs: Function;
}

export default function BlogListing({ blog, blogs, setBlogs }: IProps) {
  const { id } = blog;

  async function deleteBlog() {
    await fetch(`/api/blogs/${id}`, {
      method: 'DELETE'
    });
    setBlogs(blogs.filter((blog) => blog.id !== id));
  }

  return (
    <div className="BlogListing">
      <li>
        <a href={blog.url}>
          {blog.author} {blog.title}
        </a>
        <button onClick={deleteBlog}>[X]</button>
      </li>
    </div>
  );
}
