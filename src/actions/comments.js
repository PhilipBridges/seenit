import uuid from 'uuid';
import database from '../firebase/firebase';

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
    database.ref(`/posts/${commentpostid}/comments`).push(comment).then((ref) => {
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
    return database.ref(`/posts/${id}/comments`)
      .once('value')
      .then((snapshot) => {
        const comments = []
        snapshot.forEach((childSnapshot) => {
          comments.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          })
          dispatch(getComments(comments))
        });
      });
  }
}