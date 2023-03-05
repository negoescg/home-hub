import { createSlice } from '@reduxjs/toolkit';
import { propertyApi } from '../apis/propertyData.api';

export type PropertyState = {
  demographics: any;
  crime: any;
  planning: any;
};

const initialState: PropertyState = { demographics: null, crime: null, planning: null };

export const propertySlice = createSlice({
  name: 'property',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(propertyApi.endpoints.getDemographics.matchFulfilled, (state, { payload }) => {
      state.demographics = payload;
    });
    builder.addMatcher(propertyApi.endpoints.getCrime.matchFulfilled, (state, { payload }) => {
      state.crime = payload;
    });
    builder.addMatcher(propertyApi.endpoints.getPlanning.matchFulfilled, (state, { payload }) => {
      state.planning = payload;
    });
  },
  reducers: {},
});
