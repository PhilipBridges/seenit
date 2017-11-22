export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.profile
    case 'GET_INFO':
      return action.profile
        default:
          return state;
      }
    }