import React from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

import styles from '../styles/scrollbar.module.css';
import { IResponseTopTenTransaction } from '@/redux/services/transactions';
import { RootState } from '@/redux/store';

interface TableProps {
  data: IResponseTopTenTransaction[];
  isFetching: boolean;
}

function TableTransaction({ data = [], isFetching }: TableProps) {
  const { username } = useSelector((state: RootState) => state.auth)

  return (
    <div className={`centeredItem mt-8 flex-col md:mt-20`}>
      <div className="w-full px-4 md:w-3/4 lg:w-10/12 lg:px-0">
        <h2 className="pb-6 text-left text-2xl font-semibold">Top Ten Transactions</h2>
        <div className="rounded-lg border border-gray-300 bg-white">
          <div className="flex flex-col items-end px-4 py-2"></div>
          <div className={`table_wrapper ${styles.customScrollbar}`}>
            <table className="w-full min-w-[800px] table-fixed">
              <thead>
                <tr>
                  <th className="w-[5%]">No.</th>
                  <th className="w-[10%]">Sender</th>
                  <th className="w-[10%]">Recipient</th>
                  <th className="w-[20%]">Total Amount</th>
                  <th className="w-[20%]">Transaction Type</th>
                  <th className="w-[15%]">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.length && data.map((item, index) => (
                  <tr key={index} className='my-2'>
                    <td>{index + 1}.</td>
                    <td className={`font-medium`}>{item.sender}</td>
                    <td className={`font-medium`}>{item.recipient}</td>
                    <td className={`font-medium`}>IDR {Number(item.amount).toLocaleString()}</td>
                    <td className={`font-medium`}>{item.sender === username ? (<span className='py-1 px-4 min-w-[100px] max-w-[100px q] bg-red-400 rounded-md'>Credit</span>) : (<span className='py-1 px-4 min-w-[100px] max-w-[100px q] bg-green-300 rounded-md'>Debit</span>)}</td>
                    <td className={`font-medium`}>{moment(item.date).format('dddd, D MMMM YYYY')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <PaginationTable limit={data?.limit} skip={data?.skip} total={data?.total} isLoading={data?.isLoadingCart} onClickPrev={() => handleClickPagination('dec')} onClickNext={() => handleClickPagination('inc')} /> */}
        </div>
      </div>
    </div>
  );
}

export default TableTransaction;
