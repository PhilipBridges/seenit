import { firebase, googleAuthProvider } from '../firebase/firebase';
import uuid from 'uuid';
import database from '../firebase/firebase';
import { setPosts } from './posts'

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return (dispatch) => {
    return firebase.auth().signOut();
  };
};

