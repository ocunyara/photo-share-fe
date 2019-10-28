import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const firebaseConfig = {
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
    app.initializeApp(firebaseConfig)
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
      email: email,
    })
  }

  consoleUser() {
    if (this.auth.currentUser != null) {
      console.log(1)
      this.auth.currentUser.providerData.forEach(function(profile) {
        console.log('Sign-in provider: ' + profile.providerId)
        console.log('  Provider-specific UID: ' + profile.uid)
        console.log('  Name: ' + profile.displayName)
        console.log('  Email: ' + profile.email)
        console.log('  Photo URL: ' + profile.photoURL)
      })
    }
  }

  loadImage(photoURL) {
    this.auth.currentUser
      .updateProfile({
        photoURL: photoURL,
      })
      .then(function() {
        // Update successful.
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  addQuote(fullName) {
    if (!this.auth.currentUser) {
      // eslint-disable-next-line no-undef
      return alert('Not authorized')
    }

    return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
      fullName,
    })
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }

  getCurrentUser() {
    return {
      Name: this.auth.currentUser && this.auth.currentUser.displayName,
      Email: this.auth.currentUser && this.auth.currentUser.email,
    }
  }

  async getCurrentFullName() {
    const fullName = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()

    return fullName.get('fullName')
  }
}

export default new Firebase()
