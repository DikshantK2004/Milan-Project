import { configureStore } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { combineReducers } from '@reduxjs/toolkit'


export const counterSlice = createSlice({
  name: 'home',
  initialState: {
    cur: '',
  },
  reducers: {
    change: (state, action) =>{
        state.cur = action.payload;
    }
  },
})
