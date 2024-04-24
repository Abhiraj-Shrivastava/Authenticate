import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import rootReducer from './rootReducer';


const store = configureStore({
    // reducer: persistReducer(rootPersistConfig, rootReducer),
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {},
            serializableCheck: false,
            immutableCheck: false,
        }),
});

// const persistor = persistStore(store);

const {dispatch} = store;


export {store, dispatch, useSelector, useDispatch};
