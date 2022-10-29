import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';
axios.defaults.baseURL = 'http://192.168.91.14:8000/api/';

const header = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
};

axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

//reset data
export const resetData = createAsyncThunk('post/resetData', async () => {
  const data = 'reset';
  return data;
});

// register
export const postRegister = createAsyncThunk(
  'register/postRegister',
  async (formData, {rejectWithValue}) =>
    await axios
      .post('register', formData, header)
      .then(function (response) {
        console.log(response.data.data, 'adalah data');
        return response.data.data;
      })
      .catch(function (error) {
        console.log(error.response.data.message, 'data false');
        return rejectWithValue(error.response.data.message);
      }),
);

//login
export const postLogin = createAsyncThunk(
  'login/postLogin',
  async (formData, {rejectWithValue}) =>
    await axios
      .post('login', formData, header)
      .then(function (response) {
        // console.log(response.data, 'adalah true data');
        return response.data;
      })
      .catch(function (error) {
        console.log(error.response.data.message, 'adalah data false');
        return rejectWithValue(error.response.data.message);
      }),
);

//logout
export const postLogout = createAsyncThunk(
  'logout/postLogout',
  async rejectWithValue =>
    await axios
      .post('logout', header)
      .then(function (response) {
        console.log(response, 'adalah true data');
        return response.data;
      })
      .catch(function (error) {
        console.log(error, 'adalah error ');
        return rejectWithValue(error.response.data.message);
      }),
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    redirectAuth: 'false',
    authLoading: false,
    postRegisterError: [],
    postLoginError: [],
    postDataLogin: [],
  },

  extraReducers: {
    //reset data
    [resetData.fulfilled]: (state, action) => {
      state.redirectAuth = 'false';
      state.authStatus = 'false';
      state.postLoginError = [];
      state.redirectAuthBasic='false';
    },
    // register
    [postRegister.pending]: (state, action) => {
      state.authLoading = true;
      state.redirectAuth = false;
    },
    [postRegister.fulfilled]: (state, action) => {
      state.postDataRegister = action.payload;
      state.redirectAuthBasic = 'true';
      state.authLoading = false;
    },
    [postRegister.rejected]: (state, action) => {
      state.postRegisterError = action.payload;
      state.authLoading = false;
    }, // register

    //login
    [postLogin.pending]: (state, action) => {
      state.authLoading = true;
      state.redirectAuth = 'false';
      state.authStatus = 'pending';
    },
    [postLogin.fulfilled]: (state, action) => {
      state.postDataLogin = action.payload;
      state.redirectAuth = 'true';
      state.authLoading = false;
      state.authStatus = 'fulfilled';
    },
    [postLogin.rejected]: (state, action) => {
      state.postLoginError = action.payload;
      state.authLoading = false;
      state.authStatus = 'rejected';
    },

    //logot
    [postLogout.pending]: (state, action) => {
    },
    [postLogout.fulfilled]: (state, action) => {
      state.postDataLogout = action.payload;
      state.redirectAuth = 'true';
    },
    [postLogout.rejected]: (state, action) => {
      state.postLogoutError = action.payload;
    },
  },
});

export default authSlice.reducer;
