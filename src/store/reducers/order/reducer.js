import {
    ORDER_CREATE,
    ORDER_CHANGE_PRODUCT,
    ORDER_SAVE,
    CREATE_ORDER_LOAD,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,
} from './action_types';

export const order = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE: {
            console.log(ORDER_CREATE, action);
            return action.payload
        }
        case ORDER_SAVE: {
            console.log(ORDER_SAVE, action);
            return action.payload
        }
        case ORDER_CHANGE_PRODUCT: {
            console.log(ORDER_CHANGE_PRODUCT, action);
            return action.payload
        }

        case CREATE_ORDER_LOAD: {
            console.log(CREATE_ORDER_LOAD, action);
            return Object.assign({}, state, {
                load: action.payload,
                success: false,
                error: false,
            })
        }
        case CREATE_ORDER_SUCCESS: {
            console.log(CREATE_ORDER_SUCCESS, action);
            return Object.assign({}, state, {
                success: action.payload,
                error: false,
                load: false,
            })
        }
        case CREATE_ORDER_ERROR: {
            console.log(CREATE_ORDER_ERROR, action);
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