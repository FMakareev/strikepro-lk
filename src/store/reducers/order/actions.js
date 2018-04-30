import {
    ORDER_CREATE,
    ORDER_CHANGE_PRODUCT,
    ORDER_SAVE,
    CREATE_ORDER_LOAD,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,
} from './action_types';

export const actionCreateOrder = (data) => {
    console.log('actionCreateOrder', data);
    return {
        type: ORDER_CREATE,
        payload: data
    }
};

export const ActionChangeProduct = (state, product, count) => {
    // console.log('ActionChangeProduct: ', state);
    // console.log('ActionChangeProduct: ', product);
    // console.log('ActionChangeProduct: ', count);
    let searchResult = 0;
    let newStore = [];
    state.order.products.map((item) => {
        if (item.id === product.id) {
            searchResult = ++searchResult;
            if (count > 0) {
                item.count = count;
                item.sum = (count * product.price.price).toFixed(2);
                item.id = product.id;
                item.data = product;
                newStore.push(item);
            }

        } else {
            newStore.push(item);
        }
    });

    if (!searchResult && count > 0) {
        newStore.push({
            count: count,
            sum: (count * product.price.price).toFixed(2),
            id: product.id,
            data: product
        })
    }
    state.order.products = newStore;
    return {
        type: ORDER_CHANGE_PRODUCT,
        payload: state.order
    }
};


export const actionSaveProduct = (data) => {

    return {
        type: ORDER_SAVE,
        payload: data
    }
};


export const addProduct = (state, product, count) => {
    return (dispatch) => {
        console.log('addProduct:', state, product, count);

        console.log(state.catalog_products.products);

        state.order.products.map((item) => {

        });


        return new Promise((resolve, reject) => {
            setTimeout(() => {

                resolve(true)
            }, 5000)
        })
    }
};

const removeProduct = (state, product, count) => {
    return (dispatch) => {

    }
}


const createOrder = () => {
    return (dispatch) => {
        dispatch({
            type: CREATE_ORDER_LOAD,
            payload: true
        });

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                dispatch({
                    type: CREATE_ORDER_SUCCESS,
                    payload: true
                });
                resolve(true)
            }, 5000)
        })
    }
}
