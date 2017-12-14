import React from 'react';
import PostList from '../components/PostList';
import firebase from 'firebase';
import withFirebasePagination from 'firebase-react-paginated';

export default withFirebasePagination(firebase)({
  path: '/posts',
  orderBy: 'votes',
  length: 10
})(PostList);