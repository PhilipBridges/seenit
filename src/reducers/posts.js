const postsReducerDefaultState = [];

export default (state = postsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [
        ...state,
        action.post
      ]
    case 'SET_POSTS':
      return action.posts
    case 'SET_SEEN_POSTS':
      return action.posts
    default:
      return state;
  }
};