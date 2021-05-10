import { configureStore } from '@reduxjs/toolkit';
import carsSlice from './carsSlice';

export default configureStore({
  reducer: {
    cars: carsSlice,
  },
});
