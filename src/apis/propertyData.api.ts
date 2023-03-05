import { createApi } from '@reduxjs/toolkit/query/react';
import { basePropertyData } from './basePropertyData.api';

const apiKey = 'L4QLNPUHNJ';

export const propertyApi = createApi({
  baseQuery: basePropertyData,
  reducerPath: 'propertyApi',
  endpoints: (builder) => ({
    getDemographics: builder.query<any, string>({
      query: (payload) => ({
        url: `/demographics?key=${apiKey}&postcode=${payload.replace(/\s/g, '')}`,
        method: 'GET',
      }),
    }),
    getPlanning: builder.query<any, string>({
      query: (payload) => ({
        url: `/planning?key=${apiKey}&postcode=${payload.replace(/\s/g, '')}`,
        method: 'GET',
      }),
    }),
    getCrime: builder.query<any, string>({
      query: (payload) => ({
        url: `/crime?key=${apiKey}&postcode=${payload.replace(/\s/g, '')}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetDemographicsQuery, useGetPlanningQuery, useGetCrimeQuery } = propertyApi;
