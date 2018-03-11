import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

let createStoreMiddleware = applyMiddleware(thunk)(createStore);
const initialState = sessionStorage.getItem('StrikeProReduxStore') ? JSON.parse(sessionStorage.getItem('StrikeProReduxStore')) : {
    order:{
        id: 123,
        store_id: 1,
        products: []
    },
    catalog_category: {
        tree: {
            name: 'Категории',
            loading: true,
            children: []
        },
        load: false,
        success: false,
        error: false,
    }
};

const Store = createStoreMiddleware(
    rootReducer,
    initialState,
    composeWithDevTools(),
);

Store.subscribe(()=>{
    sessionStorage.setItem('StrikeProReduxStore', JSON.stringify(Store.getState()))
});

export {Store};
