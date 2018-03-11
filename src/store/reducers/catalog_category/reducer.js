import {
    GET_CATEGORY_LOAD,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_ERROR,
    CHANGE_TREE,
} from './action_types';

export const catalog_category = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_TREE: {
            console.log(CHANGE_TREE, action);
            return Object.assign({}, state, {
                tree: {
                    ...state.tree,
                    ...action.payload,
                }
            })
        }
        case GET_CATEGORY_LOAD: {
            console.log(GET_CATEGORY_LOAD, action);
            return Object.assign({}, state, {
                load: action.payload,
                success: false,
                error: false,
            })
        }
        case GET_CATEGORY_SUCCESS: {
            console.log(GET_CATEGORY_SUCCESS, action);
            return Object.assign({}, state, {
                success: action.payload,
                load: false,
                error: false,
            })
        }
        case GET_CATEGORY_ERROR: {
            console.log(GET_CATEGORY_ERROR, action);
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