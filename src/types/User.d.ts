import { Blog } from './Blog'

type User = {
  id: string;
  username: string;
  passwordHash: string;
  name: string;
  blogs: Blog[]
};