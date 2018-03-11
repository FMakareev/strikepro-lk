import {
    ARTICLES_URL, SET_PRODUCTS, GET_PRODUCTS_LOAD, GET_PRODUCTS_ERROR,
    GET_PRODUCTS_SUCCESS
} from "./action_type";
import normalize from 'json-api-normalize';
import {is_fetch} from "../../../utils/fetch";
import {ORDER_CHANGE_PRODUCT} from "../order/action_types";

export const getProducts = (url) => {

    return (dispatch) => {
        dispatch({
            type: GET_PRODUCTS_LOAD,
            payload: true
        });
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET',
                credentials: 'include',
                cache: 'no-cache',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    console.log(response);
                    if (response.status >= 200 && response.status < 300) {
                        return Promise.resolve(response);
                    }
                    return Promise.reject(response);
                }).then((response) => {
                return response.json()
            }).then((response) => {
                console.log(response);
                dispatch({
                    type: GET_PRODUCTS_SUCCESS,
                    payload: true
                });
                dispatch({
                    type: SET_PRODUCTS,
                    payload: transformProducts(response)
                });
                resolve(response)
            }).catch(error => {
                console.log(error);
                dispatch({
                    type: GET_PRODUCTS_ERROR,
                    payload: error
                });
                reject(error);
            })

        })
    }
};

const transformProducts = (products) => {
    const newProducts = normalize(products).get([
        'id',
        'type',
        'group_id',
        'code',
        'fullname',
        'unit',
        'article',
        'manufacturers',
        'balance',
        'price.price_type',
        'price.price',
        'logo',
        'logo.thumb_url'
    ]);
    console.log('newProducts',newProducts);
    return newProducts
}