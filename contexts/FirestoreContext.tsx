import { createContext } from 'react'
import { Firestore } from '@firebase/firestore'

export const FirestoreContext = createContext < Firestore | any> (null)