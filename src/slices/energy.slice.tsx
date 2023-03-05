import { createSlice } from '@reduxjs/toolkit';
import Papa from 'papaparse';
import { energyApi } from '../apis/energy.api';

export type EnergyState = {
  result: any;
  rowsArray: any;
  valuesArray: any;
};

const initialState: EnergyState = { result: null, rowsArray: [], valuesArray: [] };

export const energySlice = createSlice({
  name: 'energy',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(energyApi.endpoints.getEnergyInfo.matchFulfilled, (state, { payload }) => {
      if (payload) {
        Papa.parse(payload, {
          header: true,
          skipEmptyLines: true,
          complete: function (results: any) {
            // eslint-disable-next-line array-callback-return
            results.data.map((d: any) => {
              state.rowsArray.push(Object.keys(d));
              state.valuesArray.push(Object.values(d));
            });
            state.result = results.data;
          },
        });
      }
    });
  },
  reducers: {},
});
