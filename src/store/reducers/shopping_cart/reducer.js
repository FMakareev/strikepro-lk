import {
    INIT_SHOPPING_CART_LOAD,
    INIT_SHOPPING_CART_SUCCESS,
    INIT_SHOPPING_CART_ERROR,

    SHOPPING_CART_ADD_LOAD,
    SHOPPING_CART_ADD_SUCCESS,
    SHOPPING_CART_ADD_ERROR,

    SHOPPING_CART_REMOVE_LOAD,
    SHOPPING_CART_REMOVE_SUCCESS,
    SHOPPING_CART_REMOVE_ERROR,
} from './action_types';

export const shopping_cart = (state = {}, action) => {
    switch (action.type) {


        // Инициализация хранилища корзины (получаем данные о заказе и записываем в хранилище)
        case INIT_SHOPPING_CART_LOAD: {
            console.log(INIT_SHOPPING_CART_LOAD, action);
            return Object.assign({}, state, {
                load: action.payload,
                success: false,
                error: false,
            })
        }
        case INIT_SHOPPING_CART_SUCCESS: {
            console.log(INIT_SHOPPING_CART_SUCCESS, action);
            return Object.assign({}, state, {
                success: true,
                error: false,
                load: false,
                ...action.payload,
            })
        }
        case INIT_SHOPPING_CART_ERROR: {
            console.log(INIT_SHOPPING_CART_ERROR, action);
            return Object.assign({}, state, {
                error: action.payload,
                success: false,
                load: false,
            })
        }

        case SHOPPING_CART_ADD_LOAD: {
            console.log(SHOPPING_CART_ADD_LOAD, action);
            return Object.assign({}, state, {
                load: action.payload,
                success: false,
                error: false,
            })
        }
        case SHOPPING_CART_ADD_SUCCESS: {
            console.log(SHOPPING_CART_ADD_SUCCESS, action);
            return Object.assign({}, state, {
                success: true,
                error: false,
                load: false,
                ...action.payload,
            })
        }
        case SHOPPING_CART_ADD_ERROR: {
            console.log(SHOPPING_CART_ADD_ERROR, action);
            return Object.assign({}, state, {
                error: action.payload,
                success: false,
                load: false,
            })
        }

        case SHOPPING_CART_REMOVE_LOAD: {
            console.log(SHOPPING_CART_REMOVE_LOAD, action);
            return Object.assign({}, state, {
                load: action.payload,
                success: false,
                error: false,
            })
        }
        case SHOPPING_CART_REMOVE_SUCCESS: {
            console.log(SHOPPING_CART_REMOVE_SUCCESS, action);
            return Object.assign({}, state, {
                success: true,
                error: false,
                load: false,
                ...action.payload,
            })
        }
        case SHOPPING_CART_REMOVE_ERROR: {
            console.log(SHOPPING_CART_REMOVE_ERROR, action);
            return Object.assign({}, state, {
                error: action.payload,
                success: false,
                load: false,
            })
        }



        default:
            return state;
    }
};