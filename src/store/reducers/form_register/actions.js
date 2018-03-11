import {SERVER_VALID_FAIL} from "./action_types";

const setLongPropValue = (obj, array, index, value) => {
    if (index < array.length) {
        if (array[index] in obj) {
            if (index === array.length - 1) {
                obj[array[index]] = value;
            }
            return setLongPropValue(obj[array[index]], array, ++index, value);
        } else if (index === array.length - 1) {
            obj[array[index]] = value;
        } else {
            obj[array[index]] = {};
        }
        return setLongPropValue(obj[array[index]], array, ++index, value);
    } else {
        return true
    }
}


const ServerValidError = (store, error) => {
    // console.log('BEFORE: ', store);
    // console.log('ERROR: ', error);

    for (let prop in error) {
        let parts = prop.split("."),
            index = 0;
        if ('syncErrors' in store) {
            setLongPropValue(store.syncErrors, parts, index, error[prop][0]);
        } else {
            store.syncErrors = {};
            setLongPropValue(store.syncErrors, parts, index, error[prop][0]);
        }

    }
    // console.log('AFTER STORE:', store);

    return ({
        type: SERVER_VALID_FAIL,
        payload: store
    })

};

export {
    ServerValidError
}