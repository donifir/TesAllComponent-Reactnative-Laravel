import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import suplierReducer from '../features/suplierSlice'
import barangReducer from '../features/barangSlice'

export default configureStore({
  reducer: {
    auth:authReducer,
    suplier:suplierReducer,
    barang:barangReducer,
  },
})