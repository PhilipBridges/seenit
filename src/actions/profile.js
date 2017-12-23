import firebase from 'firebase'
import uuid from 'uuid';
require("firebase/firestore");
const db = firebase.firestore();

export const setInfo = (profile) => ({
  type: 'SET_USER',
  profile
});

export const fireSetInfo = (profileData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const { name = '', bio = '' } = profileData
    db.collection("users").doc(uid).set(profileData)
  }
}

export const getInfo = (profile) => ({
  type: 'GET_INFO',
  profile
})

export const fireGetInfo = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return db.collection(`users`)
      .doc(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch(getInfo(snapshot.data()))
        }
      })
  }
}