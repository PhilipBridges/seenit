import uuid from 'uuid';
import database from '../firebase/firebase';

// All Posts
export const getPosts = (posts = []) => ({
  type: 'SET_POSTS',
  posts
})

export const fireGetPosts = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`/posts`)
      .once('value')
      .then((snapshot) => {
        const posts = []

        snapshot.forEach((childSnapshot) => {
          posts.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          })
          dispatch(getPosts(posts))
        })
      })
  }
}



export const addPost = (post) => ({
  type: 'ADD_POST',
  post
});

export const fireAddPost = (postData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      title = '',
      body = '',
      author = '',
      date = 0,
      seen = '',
      seenid = '',
      postid = ''
    } = postData;
    const post = { title, body, author, date, seen, seenid, postid }
    database.ref(`/seens/${seenid}/posts`).push(post).then((ref) => {
      dispatch(addPost({
        id: ref.key,
        ...post
      }))
    });
  }
}

// Get Seen Posts
export const getSubSeens = (posts = []) => ({
  type: 'SET_SEEN_POSTS',
  posts
})

export const fireGetSubPosts = (id) => {
  return (dispatch, getState) => {
    return database.ref(`/seens/${id}/posts`)
      .once('value')
      .then((snapshot) => {
        const posts = []
        snapshot.forEach((childSnapshot) => {
          posts.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          })
          dispatch(getSubSeens(posts))
        })
      })
  }
}