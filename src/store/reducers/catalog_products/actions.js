import {
    ARTICLES_URL, SET_PRODUCTS, GET_PRODUCTS_LOAD, GET_PRODUCTS_ERROR,
    GET_PRODUCTS_SUCCESS
} from "./action_type";
import normalize from 'json-api-normalize';
import {is_fetch} from "../../../utils/fetch";
import {ORDER_CHANGE_PRODUCT} from "../order/action_types";
import {Store} from '../../store';

export const getProducts = (url, links) => {

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
                    payload: transformProducts(response, links),
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

const transformProducts = (products, links) => {
    const newProducts = {
        links: products.links,
        pagination: products.meta.pagination,
        products: normalize(products).get([
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
            'logo.thumb_url',
            'count'
        ])
    }

    if (links === 'next') {
        newProducts.products = [...newProducts.products, ...Store.getState().catalog_products.products];
    }

    if (Store.getState().shopping_cart.order.products.length) {
        const shoppingCart = Store.getState().shopping_cart.order.products;

        newProducts.products.forEach(item => {
            let shopping_cart_product = shoppingCart.find((obj) => obj.id === item.id);
            if (shopping_cart_product) {
                item.count = shopping_cart_product.count;
            } else {
                item.count = 0;
            }
        })

    } else {
        newProducts.products.map(item => item.count = 0);
    }


    return newProducts
}