import { get } from '../utils/AJAX';

export const PostsError = 'canny/posts/error';
function postError(error) {
  return {
    error,
    timestamp: Date.now(),
    type: PostsError,
  };
}

export const PostsLoaded = 'canny/posts/loaded';
function postsLoaded(posts, pages) {
  return {
    pages,
    posts,
    timestamp: Date.now(),
    type: PostsLoaded,
  };
}

export const RecountVotes = 'canny/posts/recount';
export function recountVotes(posts, pages) {
  return {
    type: RecountVotes,
  };
}

export function fetchPosts(params) {
  return async (dispatch, getState) => {
    const { error, pages, posts } = await get('/api/posts/get', params);
    if (error) {
      return dispatch(postError(error));
    }
    return dispatch(postsLoaded(posts.sort((a, b) => b.votes - a.votes), pages));
  };
}

export function loadPosts() {
  return async (dispatch, getState) => {
    await dispatch(fetchPosts());
    return dispatch(recountVotes());
  };
}
