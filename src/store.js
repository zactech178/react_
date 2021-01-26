import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from './state/root.reducer';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer);

export function configureStore(initialState) {
  const store = createStore(persistedReducer, initialState, applyMiddleware(logger));
  return store;
}

export function getPersistor(reduxStore) {
  const persistor = persistStore(reduxStore);
  return persistor;
}