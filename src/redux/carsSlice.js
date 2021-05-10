import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const carsAdapter = createEntityAdapter();
export const carSelectors = carsAdapter.getSelectors((state) => state.cars);

const carsSlice = createSlice({
  name: 'cars',
  initialState: carsAdapter.getInitialState(),
  reducers: {
    addCar: carsAdapter.addOne,
    removeCar: carsAdapter.removeOne,
    updateCar: carsAdapter.updateOne,
    carByID: carsAdapter.selectId,
  },
});

export const { addCar, removeCar, updateCar,carByID } = carsSlice.actions;
export default carsSlice.reducer;
