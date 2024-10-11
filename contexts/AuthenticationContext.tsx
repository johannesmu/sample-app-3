import { createContext } from 'react'
import { Auth } from '@firebase/auth'

export const AuthenticationContext = createContext <Auth | any> (null)