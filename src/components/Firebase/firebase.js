import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyAWLSSVZ5seBepk80IfGJ_EoiShCryffPY',
  authDomain: 'instagram-113fe.firebaseapp.com',
  databaseURL: 'https://instagram-113fe.firebaseio.com',
  projectId: 'instagram-113fe',
  storageBucket: 'instagram-113fe.appspot.com',
  messagingSenderId: '1031216888711',
  appId: '1:1031216888711:web:001359bfe539c35b',
}

firebase.initializeApp(config)

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()

export default firebase
