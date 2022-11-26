const {
  getTotalLikes,
  getFavoriteBlog,
  getAuthorWithMostBlogs,
  getAuthorWithMostLikes
} = require('../utils/list-helper');

describe('total likes', () => {
  test('getTotalLikes returns correct total', () => {
    expect(getTotalLikes([{ likes: 2 }, { likes: 3 }])).toBe(5);
  });
});

describe('favorite blog', () => {
  test('getFavoriteBlog returns blog with most likes', () => {
    expect(getFavoriteBlog([{ likes: 2 }, { likes: 4 }, { likes: 3 }])).toEqual(
      { likes: 4 }
    );
  });
});

describe('author with most blogs', () => {
  test('getAuthorWithMostBlogs returns author with most blogs', () => {
    expect(
      getAuthorWithMostBlogs([
        { author: 'Test' },
        { author: 'Test 1' },
        { author: 'Test' },
        { author: 'Test' },
        { author: 'Test 2' },
        { author: 'Test 1' }
      ])
    ).toEqual({ author: 'Test', blogs: 3 });
  });
});

describe('author with most likes', () => {
  test('getAuthorWithMostLikes returns author with most likes', () => {
    expect(
      getAuthorWithMostLikes([
        { author: 'Test', likes: 5 },
        { author: 'Test 1', likes: 8 },
        { author: 'Test', likes: 1 },
        { author: 'Test', likes: 0 },
        { author: 'Test 2', likes: 4 },
        { author: 'Test 1', likes: 5 }
      ])
    ).toEqual({ author: 'Test 1', likes: 13 });
  });
});
