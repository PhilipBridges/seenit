const seensReducerDefaultState = [];

export default (state = seensReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_SEEN':
      return [
        ...state,
        action.seen
      ]
      case 'SET_SEENS':
        return action.seens
      
    default:
      return state;
  }
};
