import {AUTH_VALID_FAIL} from "./action_type";

const validFail = (store, data) => {
    if (store && store[data.email]) {

        store[data.email] = {
            count: store[data.email].count > 0 ? --store[data.email].count : 0,
        };

    }else {
        store[data.email] = {
            count: 4,
        };
    }

    return ({type: AUTH_VALID_FAIL, payload: store});
};

const validTrue = (store, data) => {
    delete store[data.email];
    return ({type: AUTH_VALID_FAIL, payload: store});
};


export {
    validFail,
    validTrue,
}