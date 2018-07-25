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
import {UPDATE_PRODUCT} from "../catalog_products/action_type";


export const initShoppingCart = (state) => {
    return (dispatch) => {
        dispatch({
            type: INIT_SHOPPING_CART_LOAD,
            payload: true
        });
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                dispatch({
                    type: INIT_SHOPPING_CART_SUCCESS,
                    payload: {
                        order: {
                            id: 123,
                            store_id: 1,
                            count: 0,
                            sum: 0,
                            products: []
                        }
                    }
                });
                resolve(true)
            }, 5000)
        })
    }
};


export const updateProduct = (state, product, count) => {
    return (dispatch) => {

        try {
            // if (!state.shopping_cart.load) {
            dispatch({
                type: SHOPPING_CART_ADD_LOAD,
                payload: true
            });
            const State = JSON.parse(JSON.stringify(state));
            const {
                shopping_cart: {order},
                catalog_products,
            } = State;

            // Если нахожу продукт в корзине обновляю запись
            if (order.products.find((obj) => obj.id === product.id)) {
                order.products.forEach((obj) => {
                    if (obj.id === product.id) {
                        obj.count = count;
                    }
                });
            } else {
                product.count = count;
                order.products.push(product)
            }
            catalog_products.products.forEach((obj) => {
                if (obj.id === product.id) {
                    obj.count = count;
                }
            });
            let sum = 0;
            let allCount = 0;

            console.log(order);
            order.products.forEach((obj) => {
                console.log(obj);
                sum = (parseFloat(sum) + (parseFloat(obj.count) * parseFloat(obj.price.price))).toFixed(2);
                allCount =  parseInt(allCount) + parseInt(obj.count);
            });

            order.count = allCount;
            order.sum = sum;
            console.log(order);
            console.log(catalog_products);

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    dispatch({
                        type: SHOPPING_CART_ADD_SUCCESS,
                        payload: {
                            order
                        }
                    });
                    dispatch({
                        type: UPDATE_PRODUCT,
                        payload: catalog_products
                    });
                    resolve(true)
                }, 10)
            })
            // }

        } catch (error) {
            dispatch({
                type: SHOPPING_CART_ADD_ERROR,
                payload: error
            });
        }
    }
};

const ShoppingCart = (order) => {
    return (dispatch) => {

    }
}


const removeProduct = (state, product, count) => {
    return (dispatch) => {

    }
}

