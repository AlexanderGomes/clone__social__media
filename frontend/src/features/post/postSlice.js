import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }

  export const postSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {

    },
  })
  
  export const { reset } = postSlice.actions
  export default postSlice.reducer