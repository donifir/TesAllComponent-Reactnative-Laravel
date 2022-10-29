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

export const getBarang = createAsyncThunk(
  'barang/getBarang',
  async () =>
    await axios.get('barang').then(function (response) {
      console.log(response.data.data);
      return response.data.data;
    }),
);

//create barang
export const createBarang = createAsyncThunk(
  'barang/createBarang',
  async (formData, {rejectWithValue}) =>
    await axios
      .post('barang/create', formData, header)
      .then(function (response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }),
);

//Update barang
export const updateBarang = createAsyncThunk(
  'barang/updateBarang',
  async ({formData, itemId}, {rejectWithValue}) =>
    await axios
      .post(`barang/${itemId}/update`, formData, header)
      .then(function (response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      }),
);

//delete barang
export const deleteBarang = createAsyncThunk(
  'barang/deleteBarang',
  async itemId =>
    await axios.delete(`barang/${itemId}/delete`).then(function (response) {
      console.log(response.data.data);
      return itemId;
    }),
);

const barangEntity = createEntityAdapter({
  selectId: barang => barang.id,
});

const barangSlice = createSlice({
  name: 'barang',
  initialState: barangEntity.getInitialState(),

  extraReducers: {
    // getBarang
    [getBarang.fulfilled]: (state, action) => {
      barangEntity.setAll(state, action.payload);
      state.redirectBarang = '';
    },
    [getBarang.rejected]: (state, action) => {
      state.dataError = action.payload;
    },

    // createBarang
    [createBarang.fulfilled]: (state, action) => {
      barangEntity.addOne(state, action.payload);
      state.redirectBarang = 'true';
    },
    [createBarang.rejected]: (state, action) => {
      state.dataError = action.payload;
    },

    // updateBarang
    [updateBarang.fulfilled]: (state, action) => {
      barangEntity.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
      // state.redirectBarang = 'true';
    },
    [updateBarang.rejected]: (state, action) => {
      state.dataError = action.payload;
    },

    // deleteSuplier
    [deleteBarang.fulfilled]: (state, action) => {
      barangEntity.removeOne(state, action.payload);
      state.redirectBarang = 'true';
    },
  },
});

export const barangSelectors = barangEntity.getSelectors(state => state.barang); //suplier harus sama dengan di store

export default barangSlice.reducer; //agar bsa dipanggil di store
