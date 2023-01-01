import { Blog } from '../types/Blog';

function getTotalLikes(arrOfBlogs: Blog[]) {
  return arrOfBlogs.reduce((totalLikes, { likes }) => totalLikes + likes, 0);
}

function getFavoriteBlog(arrOfBlogs: Blog[]) {
  return arrOfBlogs.reduce(
    (mostLiked, current) => {
      if (current.likes > mostLiked.likes) return current;
      return mostLiked;
    },
    { likes: 0 }
  );
}

function getAuthorWithMostBlogs(arrOfBlogs: Blog[]) {
  const authorsAndCounts = arrOfBlogs.reduce(
    (authsAndCounts: Record<string, number>, currentBlog: Blog) => {
      if (authsAndCounts[currentBlog.author])
        authsAndCounts[currentBlog.author]++;
      else authsAndCounts[currentBlog.author] = 1;
      return authsAndCounts;
    },
    {}
  );

  let authorWithMostBlogs = {};
  let mostCount = 0;

  for (const author in authorsAndCounts) {
    if (authorsAndCounts[author] > mostCount) {
      authorWithMostBlogs = {
        author,
        blogs: authorsAndCounts[author]
      };

      mostCount = authorsAndCounts[author];
    }
  }

  return authorWithMostBlogs;
}

function getAuthorWithMostLikes(arrOfBlogs: Blog[]) {
  const authorsAndCounts = arrOfBlogs.reduce(
    (authsAndCounts: Record<string, number>, currentBlog: Blog) => {
      if (authsAndCounts[currentBlog.author])
        authsAndCounts[currentBlog.author] += currentBlog.likes;
      else authsAndCounts[currentBlog.author] = currentBlog.likes;
      return authsAndCounts;
    },
    {}
  );

  let authorWithMostLikes = {};
  let mostCount = 0;

  for (const author in authorsAndCounts) {
    if (authorsAndCounts[author] > mostCount) {
      authorWithMostLikes = {
        author,
        likes: authorsAndCounts[author]
      };

      mostCount = authorsAndCounts[author];
    }
  }

  return authorWithMostLikes;
}

export {
  getTotalLikes,
  getFavoriteBlog,
  getAuthorWithMostBlogs,
  getAuthorWithMostLikes
};
