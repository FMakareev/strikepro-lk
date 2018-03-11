import {
    ARTICLES_URL,
    SET_PRODUCTS,
    GET_PRODUCTS_LOAD,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
} from "./action_type";

export const catalog_products = (state = {}, action) => {
    switch (action.type) {
        case ARTICLES_URL: {
            console.log(ARTICLES_URL, action);

            return Object.assign({}, state, {
                url: action.payload
            })
        }
        case SET_PRODUCTS: {
            console.log(SET_PRODUCTS, action);

            return Object.assign({}, state, {
                products: action.payload
            })
        }
        case GET_PRODUCTS_LOAD: {
            console.log(GET_PRODUCTS_LOAD, action);

            return Object.assign({}, state, {
                error: false,
                load: action.payload,
                success: false,
            })
        }
        case GET_PRODUCTS_SUCCESS: {
            console.log(GET_PRODUCTS_SUCCESS, action);
            return Object.assign({}, state, {
                error: false,
                load: false,
                success: action.payload,
            })
        }
        case GET_PRODUCTS_ERROR: {
            console.log(GET_PRODUCTS_ERROR, action);
            return Object.assign({}, state, {
                error: action.payload,
                load: false,
                success: false,
            })
        }
        default:
            return state;
    }
};