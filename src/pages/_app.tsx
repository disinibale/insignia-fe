/* eslint-disable react-hooks/exhaustive-deps */
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import Layout from '../components/Layout';
import { store, persistor, RootState } from '../redux/store';
import { createWrapper } from 'next-redux-wrapper';
import { PersistGate } from 'redux-persist/integration/react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';

function App({ Component, pageProps }: AppProps) {

  const route = useRouter();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    if (!accessToken) {
      route.push('/auth');
    }
  }, [accessToken]);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <ToastContainer />
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </PersistGate>
  );
}

const makeStore = () => store;
export default createWrapper(makeStore).withRedux(App)


