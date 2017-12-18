import uuid from 'uuid';
import database from '../firebase/firebase';

// All Posts
export const getPosts = (posts = []) => ({
  type: 'SET_POSTS',
  posts
});

export const fireGetPosts = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`/posts`)
      .orderByChild(`votes`)
      .limitToFirst(15)
      .once('value')
      .then((snapshot) => {
        const posts = []
        snapshot.forEach((childSnapshot) => {
          posts.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          })
          dispatch(getPosts(posts))
        });
      });
  }
}

export const fireNextPosts = (e) => {
  return (dispatch, getState) => {
    const start = e
    return database.ref(`/posts`)
      .orderByChild('votes')
      .startAt(0, start)
      .limitToFirst(6)
      .once('value')
      .then((snapshot) => {
        const posts = []
        snapshot.forEach((childSnapshot) => {
          posts.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          })
          dispatch(getPosts(posts))
        });
      });
  }
}

export const firePrevPosts = (e) => {
  return (dispatch, getState) => {
    const start = e
    return database.ref(`/posts`)
      .orderByChild('votes')
      .startAt(0, start)
      .limitToLast(6)
      .once('value')
      .then((snapshot) => {
        const posts = []
        snapshot.forEach((childSnapshot) => {
          posts.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
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
    return database.ref(`/posts/${id}`)
      .orderByChild("postid")
      .once('value')
      .then((snapshot) => {
        const posts = {
          id: snapshot.key,
          ...snapshot.val()
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
    database.ref(`/posts`).push(post).then((ref) => {
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
    return database.ref(`/posts`)
      .orderByChild("seenid")
      .equalTo(id)
      .once('value')
      .then((snapshot) => {
        const posts = []
        snapshot.forEach((childSnapshot) => {
          posts.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
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
    database.ref(`/posts/${id}/voters/${uid}`).once('value')
      .then(function (snapshot) {
        if (!snapshot.exists()) {
          return database.ref(`/posts/${id}`)
            .child('votes')
            .transaction((votes) => {
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
    database.ref(`/posts/${id}/voters/${uid}`).once('value')
      .then(function (snapshot) {
        if (!snapshot.exists()) {
          return database.ref(`/posts/${id}`)
            .child('votes')
            .transaction((votes) => {
              return (votes || 0) - 1
            })
            .then((fireUpdateVote(id, uid)))
        }
      })
  }
}

export const fireUpdateVote = (id, user) => {
  return database.ref(`/posts/${id}/voters`)
    .child(`${user}`)
    .push(user)
}