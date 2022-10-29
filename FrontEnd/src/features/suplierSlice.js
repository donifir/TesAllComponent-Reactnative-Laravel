import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import axios from 'axios';

const header = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
};

//reset data
export const resetData = createAsyncThunk('post/resetData', async () => {
  const data = 'reset';
  return data;
});

//get suplier
export const getSuplier = createAsyncThunk(
  'suplier/getSuplier',
  async () =>
    await axios.get('suplier').then(function (response) {
      // console.log(response.data.data);
      return response.data.data;
    }),
);

//create suplier
export const createSuplier = createAsyncThunk(
  'suplier/createSuplier',
  async (formData, {rejectWithValue}) =>
    await axios
      .post('create/suplier', formData, header)
      .then(function (response) {
        // console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        // console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }),
);

//edit suplier
export const editSuplier = createAsyncThunk(
  'suplier/editSuplier',

  async ({formData, itemId2}, {rejectWithValue}) =>
    await axios
      .post(`suplier/${itemId2}/update`, formData, header)
      .then(function (response) {
        // console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        // console.log(error);
        return rejectWithValue(error.response.data.message);
      }),
);

//delete suplier
export const deleteSuplier = createAsyncThunk(
  'suplier/deleteSuplier',
  async (id) =>
    await axios.delete(`suplier/${id}/delete`).then(function (response) {
      console.log(response.data.data);
      return id;
    }),
);

const suplierEntity = createEntityAdapter({
  selectId: suplier => suplier.id,
});

const suplierSlice = createSlice({
  name: 'suplier',
  initialState: suplierEntity.getInitialState(),

  extraReducers: {
    //reset data
    [resetData.fulfilled]: (state, action) => {
      state.redirectSuplier = 'false';
    },

    // getSuplier
    [getSuplier.fulfilled]: (state, action) => {
      suplierEntity.setAll(state, action.payload);
    },

    // createSuplier
    [createSuplier.fulfilled]: (state, action) => {
      suplierEntity.addOne(state, action.payload);
      state.redirectSuplier = 'true';
    },
    [createSuplier.rejected]: (state, action) => {
      state.dataError = action.payload;
    },

    // editSuplier
    [editSuplier.fulfilled]: (state, action) => {
      // suplierEntity.updateOne(state, {id:action.payload.id, updates:action.payload});
      suplierEntity.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
      state.redirectSuplier = 'true';
    },
    [editSuplier.rejected]: (state, action) => {
      state.dataError = action.payload;
    },

    // deleteSuplier
    [deleteSuplier.fulfilled]: (state, action) => {
      suplierEntity.removeOne(state, action.payload);
      state.redirectSuplier = 'true';
    },
  },
});

export const suplierSelectors = suplierEntity.getSelectors(
  state => state.suplier,
); //suplier harus sama dengan di store

export default suplierSlice.reducer; //agar bsa dipanggil di store
