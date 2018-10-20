import {
	INIT_SHOPPING_CART_LOAD,
	INIT_SHOPPING_CART_SUCCESS,
	INIT_SHOPPING_CART_ERROR,

	SHOPPING_CART_ADD_LOAD,
	SHOPPING_CART_ADD_SUCCESS,
	SHOPPING_CART_ADD_ERROR,


} from './action_types';
import {UPDATE_PRODUCT} from "../catalog_products/action_type";
import {UpdateOrderAction} from "../../reduxRestEasy/order";


export const initShoppingCart = (data) => {
	return (dispatch) => {
		dispatch({
			type: INIT_SHOPPING_CART_LOAD,
			payload: true
		});
		return new Promise((resolve, reject) => {
			try {
				if (data) {
					dispatch({
						type: INIT_SHOPPING_CART_SUCCESS,
						payload: {
							order: data
						}
					});
				} else {
					dispatch({
						type: INIT_SHOPPING_CART_SUCCESS,
						payload: {
							order: null
						}
					});
				}
				resolve(true)
			} catch (e) {
				dispatch({
					type: INIT_SHOPPING_CART_ERROR,
					payload: {
						order: null,
						error: e,
					}
				});
				reject(e);
			}
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
			/** @desc клонирую стэйт */
			const State = JSON.parse(JSON.stringify(state));
			let {
				shopping_cart: {order},
				catalog_products, /** @description Продукты отображаемые в данный момент в каталоге*/
			} = State;

			console.log('order prev: ', order);
			/** @desc Если нахожу продукт в корзине обновляю запись*/
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
			let total_price = 0;
			let total_products = 0;

			/** @desc удоляем продукты колличество которых равно 0 */
			order.products = order.products.filter((item) => item.count !== 0);

			order.products.forEach((obj) => {
				total_price = (parseFloat(total_price) + (parseInt(obj.count) * parseFloat(obj.price.price).toFixed(2))).toFixed(2);
				total_products = parseInt(total_products) + parseInt(obj.count);
			});

			order.total_products = total_products;
			order.total_price = total_price;

			try {
				return new Promise((resolve, reject) => {
					dispatch(UpdateOrderAction({body: order}))
						.then(({normalizedPayload}) => {
							console.log('UpdateOrderAction: ',normalizedPayload);
							if(normalizedPayload.message){
								throw {
									message: normalizedPayload.message,
								}
							} else {
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
							}
						}).catch(error => {
						console.log(error);
						reject(error);
						dispatch({
							type: SHOPPING_CART_ADD_ERROR,
							payload: error
						});
					});
				})

			} catch (error) {
				console.log(error);
				dispatch({
					type: SHOPPING_CART_ADD_ERROR,
					payload: error
				});
			}

		} catch (error) {
			console.log(error);
			dispatch({
				type: SHOPPING_CART_ADD_ERROR,
				payload: error
			});
		}
	}
};
