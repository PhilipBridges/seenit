import firebase from 'firebase'
import uuid from 'uuid';
require("firebase/firestore");
import db from '../firebase/firebase';

// All Posts
export const getPosts = (posts = []) => ({
  type: 'SET_POSTS',
  posts
});

export const fireGetPosts = () => {
  return (dispatch, getState) => {  
    const uid = getState().auth.uid;
    return db.collection(`/posts`)
      .limit(15)
      .get()
      .then((snapshot) => {
        const posts = []
        snapshot.forEach((childSnapshot) => {
          posts.push({
            id: childSnapshot.id,
            ...childSnapshot.data()
          })
          dispatch(getPosts(posts))
        });
      });
  }
}

export const fireNextPosts = (e) => {
  return (dispatch, getState) => {
    const start = e
    return db.collection(`/posts`)
      .orderBy('votes')
      .startAt(0, start)
      .limit(6)
      .get()
      .then((snapshot) => {
        const posts = []
        snapshot.forEach((childSnapshot) => {
          posts.push({
            id: childSnapshot.id,
            ...childSnapshot.data()
          })
          dispatch(getPosts(posts))
        });
      });
  }
}

export const firePrevPosts = (e) => {
  return (dispatch, getState) => {
    const start = e
    return db.collection(`/posts`)
      .orderBy('votes')
      .startAt(0, start)
      .limit(6)
      .get()
      .then((snapshot) => {
        const posts = []
        snapshot.forEach((childSnapshot) => {
          posts.push({
            id: childSnapshot.id,
            ...childSnapshot.data()
          })
          dispatch(getPosts(posts))
        });
      });
  }
}

export const addPost = (post) => ({
  type: 'ADD_POST',
  post
});

// Get selected post
export const getSinglePost = (posts = []) => ({
  type: 'SET_POSTS',
  posts
});

export const fireGetSinglePost = (id) => {
  return (dispatch, getState) => {
    return db.collection(`/posts/${id}`)
      .orderBy("postid")
      .once('value')
      .then((snapshot) => {
        const posts = {
          id: snapshot.id,
          ...snapshot.data()
        }
        dispatch(getSinglePost(posts))
      });
  }
}


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
      postid = '',
      votes = 0,
      voters = ''
    } = postData;
    const post = { title, body, author, date, seen, seenid, postid, votes, voters }
    db.collection(`/posts`).add(post).then((ref) => {
      dispatch(addPost({
        id: ref.id,
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
    const target = (db.collection(`/posts`).doc(id))
    return db.collection(`/posts`)
      .orderBy("seenid")
      .where("target", "==", "id")
      .get()
      .then((snapshot) => {
        const posts = []
        snapshot.forEach((childSnapshot) => {
          posts.push({
            id: childSnapshot.id,
            ...childSnapshot.data()
          });
          dispatch(getSubSeens(posts))
        });
      });
  }
}

// Votes
export const fireUpVote = (id, user) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    db.collection(`/posts/${id}/voters/${uid}`).once('value')
      .then(function (snapshot) {
        if (!snapshot.exists()) {
          return db.collection(`/posts/${id}`)
            .docs('votes')
            .db.runTransaction((votes) => {
              return (votes || 0) + 1
            })
            .then((fireUpdateVote(id, uid)))
        }
      })
  }
}


export const fireDownVote = (id, user) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    db.collection(`/posts/${id}/voters/${uid}`).once('value')
      .then(function (snapshot) {
        if (!snapshot.exists()) {
          return db.collection(`/posts/${id}`)
            .docs('votes')
            .db.runTransaction((votes) => {
              return (votes || 0) - 1
            })
            .then((fireUpdateVote(id, uid)))
        }
      })
  }
}

export const fireUpdateVote = (id, user) => {
  return db.collection(`/posts/${id}/voters`)
    .docs(`${user}`)
    .push(user)
}