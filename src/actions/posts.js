import firebase from 'firebase'
import uuid from 'uuid';
require("firebase/firestore");
import db from '../firebase/firebase';

// Front page
export const getPosts = (posts = []) => ({
  type: 'SET_POSTS',
  posts
});

export const fireGetPosts = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return db.collection(`/posts`)
      .orderBy('votes', 'desc')
      .orderBy('date', 'desc')
      .limit(10)
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
    const start = e.votes
    const date = e.date
    return db.collection(`/posts`)
      .orderBy('votes', 'desc')
      .orderBy('date', 'desc')
      .startAfter(start, date)
      .limit(10)
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
    const start = e.votes
    const date = e.date
    return db.collection(`/posts`)
      .orderBy('votes', 'asc')
      .orderBy('date', 'asc')
      .startAfter(start, date)
      .limit(10)
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


// Specific seen posts
export const getSubSeens = (posts = []) => ({
  type: 'SET_SEEN_POSTS',
  posts
})

export const fireGetSubPosts = (id) => {
  return (dispatch, getState) => {
    return db.collection(`/posts`)
      .where("seenid", "==", id)
      .orderBy('votes', 'desc')
      .orderBy('date', 'desc')
      .limit(10)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const posts = []
          snapshot.forEach((childSnapshot) => {
            posts.push({
              id: childSnapshot.id,
              ...childSnapshot.data()
            });
            console.log(posts)
            dispatch(getSubSeens(posts))
          });
        } else {
          const emp = [{
            title: 'No Posts!'
          }]
          dispatch(getSubSeens(emp))
        }
      });
  }
}

export const fireNextSubPosts = (e) => {
  return (dispatch, getState) => {
    const seenid = e.seenid
    const start = e.votes
    const date = e.date
    return db.collection(`/posts`)
      .where('seenid', '==', seenid)
      .orderBy('votes', 'desc')
      .orderBy('date', 'desc')
      .startAfter(start, date)
      .limit(10)
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

export const firePrevSubPosts = (e) => {
  return (dispatch, getState) => {
    const seenid = e.seenid
    const start = e.votes
    const date = e.date
    return db.collection(`/posts`)
      .where('seenid', '==', seenid)
      .orderBy('votes', 'asc')
      .orderBy('date', 'asc')
      .startAfter(start, date)
      .limit(10)
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
      voters = {}
    } = postData;
    const post = { title, body, author, date, seen, seenid, postid, votes, voters }
    db.collection(`/posts`).add(post).then((ref) => {
      console.log(ref)
      dispatch(addPost({
        id: ref.id,
        ...post
      }))
    });
  }
}

// Get selected post
export const getSinglePost = (posts = []) => ({
  type: 'SET_POSTS',
  posts
});

export const fireGetSinglePost = (id) => {
  return (dispatch, getState) => {
    const target = (db.collection(`/posts`).doc(id))
    return db.collection(`/posts/`)
      .doc(id)
      .get()
      .then((snapshot) => {
        const posts = {
          id: snapshot.id,
          ...snapshot.data()
        }
        dispatch(getSinglePost(posts))
      });
  }
}

// Votes
export const fireUpVote = (id, user) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const ref = db.collection(`/posts/`).doc(id)
    return db.collection(`/posts/`)
      .doc(id)
      .collection('voters')
      .doc(uid)
      .get()
      .then(function (snapshot) {
        if (snapshot.exists === false) {
          return db.runTransaction(function (transaction) {
            return transaction.get(ref).then(function (post) {
              let newVote = post.data().votes + 1
              transaction.update(ref, { votes: newVote })
            })
          })
            .then((fireUpdateVote(id, uid)))
        }
      })
  }
}


export const fireDownVote = (id, user) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const ref = db.collection(`/posts/`).doc(id)
    return db.collection(`/posts/`)
      .doc(id)
      .collection('voters')
      .doc(uid)
      .get()
      .then(function (snapshot) {
        if (snapshot.exists === false) {
          return db.runTransaction(function (transaction) {
            return transaction.get(ref).then(function (post) {
              let newVote = post.data().votes - 1
              transaction.update(ref, { votes: newVote })
            })
          })
            .then((fireUpdateVote(id, uid)))
        }
      })
  }
}

export const fireUpdateVote = (id, user) => {
  db.collection(`/posts/`)
    .doc(id)
    .collection('voters')
    .doc(user)
    .set({ id: user })
}