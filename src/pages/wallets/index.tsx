import { useGetWalletBalanceQuery, useTopupBalanceMutation, useTransferBalanceMutation } from '@/redux/services/wallet';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function WalletsPage() {
  const [walletPayload, setWalletPayload] = useState({
    topupAmount: 0,
    transferAmount: 0,
    recipient: '',
  });
  const { data } = useGetWalletBalanceQuery('');
  const [ topup ] = useTopupBalanceMutation();
  const [ transfer ] = useTransferBalanceMutation();

  const handleTopUp = useCallback((e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    topup({
      amount: Number(walletPayload.topupAmount),
    });
  }, [topup, walletPayload.topupAmount]);

  const handleTransfer = useCallback((e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    transfer({
      amount: Number(walletPayload.transferAmount),
      to_username: walletPayload.recipient,
    })
  }, [transfer, walletPayload.recipient, walletPayload.transferAmount]);

  const handleChangeInput = useCallback((type: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setWalletPayload({...walletPayload, [type]: e.currentTarget.value})
  }, [walletPayload]);

  return (
    <div className='centeredItem h-full'>
      <div className='flex flex-col gap-8 border-2 border-purple-600 rounded-xl p-8 w-3/4'>
        <div className='flex flex-row justify-between items-center'>
          <p className='text-lg'>Balance:</p>
          {data?.balance ? <p className='text-2xl'><span>$ {(Number(data.balance)).toLocaleString()}</span></p> : <p className='text-2xl'>NA</p>} 
        </div>
        <form>
          <div className='flex flex-row'>
            <input onChange={handleChangeInput('topupAmount')} className='outline-none border-purple-600' placeholder='Topup Amount'></input>
            <button type="submit" onClick={handleTopUp} className='bg-purple-600 text-white'>Top Up</button>
          </div>
        </form>
        <form>
          <div className='flex flex-row gap-2'>
            <input onChange={handleChangeInput('transferAmount')} className='outline-none border-purple-600' placeholder='Transfer Amount'></input>
            <input onChange={handleChangeInput('recipient')} className='outline-none border-purple-600' placeholder='Recipient'></input>
            <button type="submit" onClick={handleTransfer} className='bg-purple-600 text-white'>Transfer Ballance</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WalletsPage;