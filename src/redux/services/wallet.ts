import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store';
import { toast } from 'react-toastify';

interface IErrorResponse {
  message: string[] | string;
}

export const walletApi = createApi({
  reducerPath: 'walletApi',
  tagTypes: ['wallet'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://7857-103-129-95-180.ngrok-free.app/api/v1', 
  prepareHeaders: (headers, { getState }) => {
    const { auth } = getState() as RootState;
    const accessToken = auth.accessToken ?? '';
    headers.set('ngrok-skip-browser-warning', "69420");
    headers.set('Authorization', `bearer ${accessToken}`);
  }, }),
  endpoints: (builder) => ({
    getWalletBalance: builder.query({
      query: () => `wallet/balance`,
      providesTags: [{ type: 'wallet', id: 'BALANCE'}],
    }),
    topupBalance: builder.mutation({
      query(body) {
        return {
          url: `wallet/topup`,
          method: 'POST',
          body,
        }
      },
      transformErrorResponse: (baseReturn) => {
        const data = baseReturn.data as IErrorResponse
        if (typeof data.message === 'string') {
          toast.error(data.message);
        } else {
          data.message.forEach(element => {
            toast.error(element);
            return element
          });
        }
        return baseReturn;
      },
      invalidatesTags: [{ type: 'wallet' as never, id: 'BALANCE' }],
    }),
    transferBalance: builder.mutation({
      query(body) {
        return {
          url: `wallet/transfer`,
          method: 'POST',
          body,
        }
      },
      transformErrorResponse: (baseReturn) => {
        const data = baseReturn.data as IErrorResponse
        if (typeof data.message === 'string') {
          toast.error(data.message);
        } else {
          data.message.forEach(element => {
            toast.error(element);
            return element
          });
        }

        return baseReturn;
      },
      invalidatesTags: [{ type: 'wallet' as never, id: 'BALANCE' }],
    }),
  }),
})

export const { useGetWalletBalanceQuery, useTopupBalanceMutation, useTransferBalanceMutation } = walletApi