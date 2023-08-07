import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyCgFTNk4z1g1td5ZYNHi-wgVx1jo5MozcE',
    authDomain: 'schovid-59af4.firebaseapp.com',
    databaseURL: 'https://schovid-59af4-default-rtdb.firebaseio.com',
    projectId: 'schovid-59af4',
    storageBucket: 'schovid-59af4.appspot.com',
    messagingSenderId: '816775760819',
    appId: '1:816775760819:web:dd6d35feeb3ea22e1559c6'
}

// Initialize Firebase
//if(!firebase.app.length){
    //const Firebase = firebase.initializeApp(firebaseConfig)
//}

if (!firebase.apps.length) {
    const Firebase = firebase.initializeApp(firebaseConfig)
}
//by commenting this i got my result
// firebase.firestore.settings({ experimentalForceLongPolling: false })
const db = firebase.firestore()
export { db }
export default firebase