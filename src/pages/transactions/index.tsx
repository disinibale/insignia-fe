import TableCarts from '@/components/TableTransaction';
import React from 'react';
import Head from 'next/head';
import Loader from '@/components/Loader';
import { useGetTopTenTransactionsQuery } from '@/redux/services/transactions';

function Carts() {
  const { data, isLoading: isLoadingTransaction, isFetching } = useGetTopTenTransactionsQuery('');

  return (
    <div>
      <Head>
        <title>Table Carts</title>
      </Head>

      {isLoadingTransaction && <Loader />}
      {!isLoadingTransaction && <TableCarts data={data} isFetching={isFetching} />}
    </div>
  );
}

export default Carts;
