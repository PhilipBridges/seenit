import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import postsReducer from '../reducers/posts';
import profileReducer from '../reducers/profile';
import seensReducer from '../reducers/seens';
import commentsReducer from '../reducers/comments';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      posts: postsReducer,
      profile: profileReducer,
      seens: seensReducer,
      comments: commentsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
