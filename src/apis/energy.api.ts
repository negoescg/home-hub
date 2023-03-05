import { createApi } from '@reduxjs/toolkit/query/react';
import { baseEnergyQuery } from './baseEnergyQuery.api';

export const energyApi = createApi({
  baseQuery: baseEnergyQuery,
  reducerPath: 'energyApi',
  endpoints: (builder) => ({
    getEnergyInfo: builder.query<any, string>({
      query: (payload) => ({
        url: `?postcode=${payload.replace(/\s/g, '')}`,
        method: 'GET',
        responseHandler: (response) => response.text(),
      }),
    }),
  }),
});

export const { useGetEnergyInfoQuery } = energyApi;
