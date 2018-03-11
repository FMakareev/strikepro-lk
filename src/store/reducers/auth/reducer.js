import {AUTH_VALID_FAIL} from './action_type';

export const auth = (state = {}, action) => {
    switch (action.type) {
        case AUTH_VALID_FAIL: {
            console.log(AUTH_VALID_FAIL, action);
            return action.payload
        }
        default:
            return state;
    }
};