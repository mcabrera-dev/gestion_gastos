import { getFirestore } from 'firebase/firestore/lite'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyC3L9SvMDcu2Xrhk4kBMIXfwqLpkBeogfg',
  authDomain: 'gastos-compartidos-aa43a.firebaseapp.com',
  projectId: 'gastos-compartidos-aa43a',
  storageBucket: 'gastos-compartidos-aa43a.appspot.com',
  messagingSenderId: '682983721671',
  appId: '1:682983721671:web:3f8edb6a2ace787fbdcce2',
  measurementId: 'G-HC9NYE2HXG'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app, db }
