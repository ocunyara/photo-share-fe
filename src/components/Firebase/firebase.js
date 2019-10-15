import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
  apiKey: 'AIzaSyAWLSSVZ5seBepk80IfGJ_EoiShCryffPY',
  authDomain: 'instagram-113fe.firebaseapp.com',
  databaseURL: 'https://instagram-113fe.firebaseio.com',
  projectId: 'instagram-113fe',
  storageBucket: 'instagram-113fe.appspot.com',
  messagingSenderId: '1031216888711',
  appId: '1:1031216888711:web:001359bfe539c35b',
}

class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return this.auth.signOut()
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password)

    return this.auth.currentUser.updateProfile({
      displayName: name,
    })
  }

  // addQuote(firstName) {
  //   if(!this.auth.currentUser) {
  //     return alert('Not authorized')
  //   }
  //
  //   return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
  //     firstName
  //   })
  // }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName
  }

  async getCurrentUserQuote() {
    const firstName = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
    // return firstName.get('quote')
  }
}

export default new Firebase()
