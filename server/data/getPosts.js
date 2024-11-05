import sortBy from '../utils/sortBy';
import Posts from './posts';

const PageSize = 10;

export default (page, sort) => {
  const start = PageSize * (page - 1);
  const end = PageSize * page;

  let posts;
  if (sort === 'new') {
    posts = sortBy(Posts, 'created', true);
  } else if (sort === 'old') {
    posts = sortBy(Posts, 'created');
  } else if (sort === 'top') {
    posts = sortBy(Posts, 'votes', true);
  } else {
    posts = [...Posts];
  }

  return {
    pages: Math.ceil(Posts.length / PageSize),
    posts: posts.slice(start, end),
  };
};
