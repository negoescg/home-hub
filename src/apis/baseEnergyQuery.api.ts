import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';

const token = 'ZGFuLm5lZ29lc2N1NEBnbWFpbC5jb206NDlhMjJjZDBkNTYxZjI0YTM0ZDA0NzJkOWU4NmNlNDEyZTEzZWU1Nw==';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://epc.opendatacommunities.org/api/v1/domestic/search',
  prepareHeaders: (headers) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (token) {
      headers.set('Authorization', `Basic ${token}`);
      headers.set('Accept', 'text/csv');
    }

    return headers;
  },
});

export const baseEnergyQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};
