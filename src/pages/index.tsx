import React, { useMemo } from 'react';
import Head from 'next/head';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IResponseTopTransaction, useGetTopTransactionsQuery } from '@/redux/services/transactions';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

function Home() {
  const { data } = useGetTopTransactionsQuery('');

  const chartData = useMemo(() => {    
    return {
      data: data?.map((item: IResponseTopTransaction) => item.transacted_value) ?? [],
      labels: data?.map((item: IResponseTopTransaction) => item.username) ?? []
    };
  }, [data])

  return (
    <div>
      <Head>
        <title>Analytics</title>
      </Head>

      <div className="my-8 mx-4 md:mx-16">
        <Bar options={options} data={{
          labels: chartData.labels,
          datasets: [{
            label: 'Top Transaction Users',
            data: chartData.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
            ],
            borderWidth: 1
          }]
        }}/>
      </div>
    </div>
  );
}

export default Home;