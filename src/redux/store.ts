import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AuthSlice from './slices/authSlice';
import productSlice from './slices/productSlice';
import cartSlice from './slices/cartSlice';
import { dummyJSONApi } from './services/dummyJSONCore';
import { walletApi } from './services/wallet';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { transactionsApi } from './services/transactions';

const persistConfig = {
  key: process.env.NEXT_PUBLIC_FINGERPRINT_NAME ?? '',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  [dummyJSONApi.reducerPath]: dummyJSONApi.reducer,
  [walletApi.reducerPath]: walletApi.reducer,
  [transactionsApi.reducerPath]: transactionsApi.reducer,
  auth: AuthSlice,
  product: productSlice,
  cart: cartSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
 })
  .concat(dummyJSONApi.middleware)
  .concat(walletApi.middleware)
  .concat(transactionsApi.middleware)
});

export const persistor = persistStore(store);



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
