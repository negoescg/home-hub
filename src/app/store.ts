import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { energyApi } from '../apis/energy.api';
import { energySlice } from '../slices/energy.slice';

const reducers = {
  [energyApi.reducerPath]: energyApi.reducer,
  [energySlice.name]: energySlice.reducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const store = configureStore({
  reducer: combinedReducer,
  devTools: process.env.NODE_ENV === 'production' ? false : true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([energyApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
