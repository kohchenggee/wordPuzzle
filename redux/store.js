import { configureStore } from '@reduxjs/toolkit'
import pageReducers from './reducers/pageReducers';
 
export const store = configureStore({
    reducer: {
        pageCount: pageReducers
    },
  })