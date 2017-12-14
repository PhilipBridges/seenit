import uuid from 'uuid';
import database from '../firebase/firebase';

export const setInfo = (profile) => ({
  type: 'SET_USER',
  profile
});

export const fireSetInfo = (profileData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const { bio = '' } = profileData
    const profile = { bio }
    database.ref(`users/${uid}/profile`).update(profile).then(() => {
      dispatch(setInfo({
        ...profile
      }))
    })
  }
}

export const getInfo = (profile) => ({
  type: 'GET_INFO',
  profile
})

export const fireGetInfo = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/profile`)
      .once('value')
      .then((snapshot) => {
        
        const data = snapshot.val()
        const profile = {...data}
          dispatch(getInfo(profile))
        })
  }
}