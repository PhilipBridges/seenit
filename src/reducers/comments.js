const commentsReducerDefaultState = [];

export default (state = commentsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
    return [
      ...state,
      action.comment
    ]
    case 'GET_COMMENTS':
    return action.comments
    default:
      return state;
  }
};
