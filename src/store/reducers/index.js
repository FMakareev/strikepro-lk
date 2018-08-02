import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import { reducer } from '@brigad/redux-rest-easy';

import {catalog_products} from './catalog_products/reducer';
import {catalog_category} from './catalog_category/reducer';
import {shopping_cart} from './shopping_cart/reducer';

import {order} from './order/reducer';
import {FormRegister} from "./form_register/reducer";

export default combineReducers({
    form: formReducer.plugin({
        ...FormRegister
    }),
    catalog_products,
    catalog_category,
    shopping_cart,
    order,
    restEasy: reducer,
});