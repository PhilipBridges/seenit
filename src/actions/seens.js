import uuid from 'uuid';
import database from '../firebase/firestore';
const db = firebase.firestore();

// Seens
export const getSeens = (seens = []) => ({
  type: 'SET_SEENS',
  seens
})

export const fireGetSeens = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`/seens`)
      .once('value')
      .then((snapshot) => {
        const seens = []

        snapshot.forEach((childSnapshot) => {
          seens.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          })
          dispatch(getSeens(seens))
        })
      })
  }
}

export const fireGetCities = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return db.collection("cities")
      .orderBy("population")
      .limit(25)
      .get()
      .then((data) => {
        data.forEach((snapshot) => {
          console.log(snapshot.data())
        })
      })
      .catch((err) => {
        console.log(err)
      })
    dispatch(getSeens(seens))
  }
}


export const addSeen = (seen) => ({
  type: 'ADD_SEEN',
  seen
});

export const fireAddSeen = (seenData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      title = '',
      body = '',
      author = '',
      date = 0
    } = seenData;
    const seen = { title, body, author, date }
    database.ref(`/seens/`).push(seen).then((ref) => {
      dispatch(addSeen({
        id: ref.database.ref(`/posts/${id}`),
        ...seen
      }))
    });
  }
}