import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import logger from 'redux-logger'

import { persistStore } from 'redux-persist'

const middlewares = [logger]



const store = createStore(rootReducer, applyMiddleware(...middlewares));

const persistor = persistStore(store)

export { store, persistor };