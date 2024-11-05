import { PostsError, PostsLoaded, RecountVotes } from '../actions/posts';

const InitialState = {
  error: null,
  pages: 0,
  posts: [],
  votes: 0,
};

export default function posts(state = InitialState, action) {
  switch (action.type) {
    case PostsError: {
      return {
        ...state,
        error: action.error,
      };
    }

    case PostsLoaded: {
      return {
        ...state,
        error: null,
        pages: action.pages,
        posts: action.posts,
      };
    }

    case RecountVotes: {
      const votes = state.posts.reduce((prev, post) => {
        return prev + post.votes;
      }, 0);
      return {
        ...state,
        votes,
      };
    }

    default:
      return state;
  }
}
