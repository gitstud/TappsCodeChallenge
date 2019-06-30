import { createStore, ApplyMiddleware, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


const initialState = { pins: {} };

const middleware = [thunk];

const composeEnhancers = compose(
    applyMiddleware(...middleware),
);

export default () => {
    let store = createStore(
        persistedReducer,
        initialState,
        composeEnhancers
    );
    let persistor = persistStore(store);
    return { store, persistor };
}