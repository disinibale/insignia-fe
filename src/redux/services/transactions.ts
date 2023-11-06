import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store';

export interface IResponseTopTransaction {
  transacted_value: string;
  username: string;
}

export interface IResponseTopTenTransaction {
  recipient: string,
  sender: string,
  amount: string,
  date: string
}

export const transactionsApi = createApi({
  reducerPath: 'transactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://7857-103-129-95-180.ngrok-free.app/api/v1', 
  prepareHeaders: (headers, { getState }) => {
    const { auth } = getState() as RootState;
    const accessToken = auth.accessToken ?? '';
    headers.set('ngrok-skip-browser-warning', "69420");
    headers.set('Authorization', `bearer ${accessToken}`);
  }, }),
  endpoints: (builder) => ({
    getTopTenTransactions: builder.query({
      query: () => `transaction/top-transaction-per-user`,
      providesTags: (result, error) => {
        if (error) {
          console.error(error);
          return [{ type: 'transactions', value: 'TOPTEN' }];
        }
        if (result) {
          return [
            { type: 'transactions', value: 'TOPTEN' },
            ...result.map(({ id }: {id: string}) => ({ type: 'transactions', id } as const)),
          ];
        }
        return [{ type: 'transactions', value: 'TOPTEN' }];
      }
    }),
    getTopTransactions: builder.query({
      query: () => `transaction/top-user`,
      providesTags: (result, error) => {
        if (error) {
          console.error(error);
          return [{ type: 'transactions', value: 'TOP' }];
        }
        if (result) {
          return [
            { type: 'transactions', value: 'TOP' },
            ...result?.map(({ id }: {id: string}) => ({ type: 'transactions', id } as const)),
          ];
        }
        return [{ type: 'transactions', value: 'TOP' }];
      }
    }),
  }),
})

export const { useGetTopTenTransactionsQuery, useGetTopTransactionsQuery } = transactionsApi