import firebase from 'firebase'
import uuid from 'uuid';
require("firebase/firestore");
import db from '../firebase/firebase';

// Add comments
export const addComment = (comment) => ({
  type: 'ADD_COMMENT',
  comment
});

export const fireAddComment = (commentData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      title = '',
      body = '',
      author = '',
      date = 0,
      seen = '',
      seenid = '',
      commentid = '',
      votes = 0,
      voters = '',
      commentpostid = '',
      seenname = '',
    } = commentData;
    const comment = { title, body, author, date, seen, seenname, seenid, commentpostid, commentid, votes, voters }
    db.collection(`/posts/`).doc(commentpostid).collection('comments').add(comment).then((ref) => {
      dispatch(addComment({
        id: ref.key,
        ...comment
      }))
    });
  }
}

// Retrieve comments

export const getComments = (comments) => ({
  type: 'GET_COMMENTS',
  comments
});

export const fireGetComments = (id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return db.collection(`posts`).doc(id).collection('comments')
      .get()
      .then((snapshot) => {
        const comments = []
        snapshot.forEach((childSnapshot) => {
          comments.push({
            id: childSnapshot.id,
            ...childSnapshot.data()
          })
          dispatch(getComments(comments))
        });
      });
  }
}