import { LoginPayload, userLogin } from '@/redux/actions/auth';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AuthPage() {
  const dispatch = useDispatch<AppDispatch>();

  const route = useRouter();
  const { accessToken } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    if (accessToken) {
      route.push('/');
    }
  }, [accessToken, route]);

  const [loginPayload, setLoginPayload] = useState<LoginPayload>({
    username: '',
    password: '',
  });
  
  const handleChangeInput = useCallback((type: string) => (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoginPayload({...loginPayload, [type]: e.currentTarget.value})
  }, [loginPayload]);

  const handleSubmit = useCallback((e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(userLogin(loginPayload));
  }, [dispatch, loginPayload]);

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <form className='flex flex-col gap-4 p-8 border-[1px] border-purple-600 rounded-md'>
        <label className='text-center text-2xl'>Sign In</label>
        <input value={loginPayload.username} onChange={handleChangeInput('username')} className="outline-none border-purple-600" placeholder='Username' />
        <input value={loginPayload.password} onChange={handleChangeInput('password')} type="password" className="outline-none border-purple-600" placeholder='Password' />
        <button type='submit' onClick={handleSubmit} className='outline-none border-none w-full bg-purple-600 m-0 text-white'>Sign In</button>
      </form>
    </div>
  );
}

export default AuthPage;
