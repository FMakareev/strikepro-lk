import {USER_UPDATE_TOKEN, USER_LOGIN, USER_LOGOUT, USER_SET_DATA, USER_GET_DATA} from './action_type';

export const user = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_TOKEN: {
            console.log(USER_UPDATE_TOKEN, action);
            return action.payload
        }
        case USER_LOGIN: {
            console.log(USER_LOGIN, action);
            return action.payload
        }
        case USER_LOGOUT: {
            console.log(USER_LOGOUT, action);
            return action.payload
        }
        case USER_SET_DATA: {
            console.log(USER_SET_DATA, action);
            return action.payload
        }
        case USER_GET_DATA: {
            console.log(USER_GET_DATA, action);
            return action.payload
        }
        default:
            return state;
    }
};