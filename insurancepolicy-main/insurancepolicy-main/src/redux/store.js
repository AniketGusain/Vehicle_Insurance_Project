import { configureStore } from '@reduxjs/toolkit'
import userState  from './slices/users'
export const store = configureStore({
  reducer: {
    user : userState
  },
})
