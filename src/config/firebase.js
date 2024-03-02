import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, initializeAuth } from 'firebase/auth'
import { getReactNativePersistence } from 'firebase/auth/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyA-x8o6ma49YAhmuy9RK0ZQ46ZDVirdKPE",
  authDomain: "fitness-app-76a49.firebaseapp.com",
  projectId: "fitness-app-76a49",
  storageBucket: "fitness-app-76a49.appspot.com",
  messagingSenderId: "822235603858",
  appId: "1:822235603858:web:0f1d6c4f90e1cdb675d74b"
};

let FirebaseApp = null
let Authentication = null

if (getApps().length === 0) {
  FirebaseApp = initializeApp(FIREBASE_CONFIG)
  Authentication = initializeAuth(FirebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
  })
} else {
  FirebaseApp = getApp()
  Authentication = getAuth()
}

const Firestore = getFirestore(FirebaseApp)
const Storage = getStorage(FirebaseApp)

export { Authentication, Firestore, Storage }