import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDkq-OdpP-mhk65LPyjh5KlUTubix7OE3k',
  authDomain: 'catch-of-the-day-jenaro.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-jenaro.firebaseio.com',
})

const base = Rebase.createClass(firebaseApp.database())

export { firebaseApp }
export default base
