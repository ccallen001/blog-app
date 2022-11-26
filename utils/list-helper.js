function getTotalLikes(arrOfBlogs) {
  return arrOfBlogs.reduce((totalLikes, { likes }) => totalLikes + likes, 0);
}

function getFavoriteBlog(arrOfBlogs) {
  return arrOfBlogs.reduce(
    (mostLiked, current) => {
      if (current.likes > mostLiked.likes) return current;
      return mostLiked;
    },
    { likes: 0 }
  );
}

function getAuthorWithMostBlogs(arrOfBlogs) {
  const authorsAndCounts = arrOfBlogs.reduce((authsAndCounts, currentBlog) => {
    if (authsAndCounts[currentBlog.author])
      authsAndCounts[currentBlog.author]++;
    else authsAndCounts[currentBlog.author] = 1;
    return authsAndCounts;
  }, {});

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

function getAuthorWithMostLikes(arrOfBlogs) {
  const authorsAndCounts = arrOfBlogs.reduce((authsAndCounts, currentBlog) => {
    if (authsAndCounts[currentBlog.author])
      authsAndCounts[currentBlog.author] += currentBlog.likes;
    else authsAndCounts[currentBlog.author] = currentBlog.likes;
    return authsAndCounts;
  }, {});

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

module.exports = {
  getTotalLikes,
  getFavoriteBlog,
  getAuthorWithMostBlogs,
  getAuthorWithMostLikes
};
