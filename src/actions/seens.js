import firebase from 'firebase'
import uuid from 'uuid';
require("firebase/firestore");
import db from '../firebase/firebase';

// Seens
export const getSeens = (seens = []) => ({
  type: 'SET_SEENS',
  seens
})

export const fireGetSeens = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return db.collection("seens")
      .limit(25)
      .get()
      .then((data) => {
        const seens = []
        data.forEach((snapshot) => {
          seens.push({
            id: snapshot.id,
            ...snapshot.data()
          })
          dispatch(getSeens(seens))
        })
      })
      .catch((err) => {
        console.log(err)
      })
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
    db.collection(`/seens/`).add(seen).then((ref) => {
      dispatch(addSeen({
        id: ref.id,
        ...seen
      }))
    });
  }
}