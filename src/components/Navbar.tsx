import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BsInboxesFill } from 'react-icons/bs';
import { FaShoppingCart, FaRegChartBar, FaWallet, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { resetAuthData } from '@/redux/slices/authSlice';

type Props = {};

function Navbar({}: Props) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const navbarList: { id: number; name: string; path: string; element: React.ReactNode }[] = [
    { id: 2, name: 'Home', path: '/', element: <FaRegChartBar /> },
    { id: 3, name: 'Transactions', path: '/transactions', element: <FaShoppingCart /> },
    { id: 4, name: 'Wallets', path: '/wallets', element: <FaWallet /> },
  ];

  const handleLogout = useCallback(() => {
    dispatch(resetAuthData());
  }, [dispatch])

  return (
    <div className="fixed w-full md:w-fit">
      <div className="flex flex-row bg-white shadow-2xl md:h-screen md:w-48 md:flex-col lg:w-64">
        <div className="hidden items-center border-r border-purple-600 p-4 font-bold md:flex md:border-b md:border-r-0">
          <p>Dashboard</p>
        </div>
        <div className="py-4">
          <ul className="flex flex-row md:flex-col">
            {navbarList.map((el) => (
              <li className="flex w-full cursor-pointer px-2 md:pb-2" key={el.id} onClick={() => router.push(el.path)}>
                <div className={`flex w-full items-center rounded-md px-2 py-1 hover:bg-purple-600 hover:text-white ${router.route === el.path ? 'bg-purple-600 text-white' : ''}`}>
                  {el.element} <p className="ml-2">{el.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-end py-4 flex-1">
            <button onClick={handleLogout} type="button" className={`flex text-xl px-4 w-full bg-transparent border-none items-center rounded-md px-2 py-1 hover:bg-purple-600 hover:text-white`}>
              <FaSignOutAlt /> <p className="ml-2">Logout</p>
            </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
