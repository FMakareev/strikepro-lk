import {createResource} from "@brigad/redux-rest-easy/dist/redux-rest-easy.es";
import {getToken} from "./networkHelpers/getToken";
import handleStatusCode from "./networkHelpers/handleStatusCode";


const order = createResource('order')({
    getOrders: {
        method: 'GET',
        url: 'http://new.strikepro.ru/api/v1/orders',
        afterHook: () => console.log('Get stores successfully'),
        networkHelpers: {
            getToken: getToken,
            handleStatusCode,
            async requestGET() {
                let CurrentUser = await this.getToken().then(res => res);
                return {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${CurrentUser.access_token}`,
                    },
                };
            },
        },
    },
    getProducts:{
        method: 'GET',
        url: 'http://new.strikepro.ru/api/v1/order/::id',
        networkHelpers: {
            getToken: getToken,
            handleStatusCode,
            async requestGET() {
                let CurrentUser = await this.getToken().then(res => res);
                return {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${CurrentUser.access_token}`,
                    },
                };
            },
        },
    },
    createOrder:{
        method: 'POST',
        url: 'http://new.strikepro.ru/api/v1/order',
        normalizer: response => {
            console.log('POST create response', response)
        },
        networkHelpers: {
            getToken: getToken,
            handleStatusCode,
            async requestPOST(body) {
                let CurrentUser = await this.getToken().then(res => res);
                return {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${CurrentUser.access_token}`,
                    },
                    body: JSON.stringify(body),
                };
            },
        },
    },
    deleteOrder: {
        method: 'DELETE',
        url: 'http://new.strikepro.ru/api/v1/order/::id',
        networkHelpers: {
            getToken: getToken,
            handleStatusCode,
            async requestDELETE(body) {
                let CurrentUser = await this.getToken().then(res => res);
                return {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${CurrentUser.access_token}`,
                    },
                    body: JSON.stringify(body),
                };
            },
        },
    },
    updateOrder: {
        method: 'PUT',
        url: 'http://new.strikepro.ru/api/v1/orders',
        networkHelpers: {
            getToken: getToken,
            handleStatusCode,
            async requestPUT(body) {
                let CurrentUser = await this.getToken().then(res => res);
                return {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${CurrentUser.access_token}`,
                    },
                    body: JSON.stringify(body),
                };
            },
        },
    },
});

const {
    actions: {
        resource: {
            invalidate: invalidateUsers,
            invalidateId: invalidateUser,
            reset: ResetOrders
        },
        getOrders: {
            perform: GetOrdersAction
        },
        createOrder: {
            perform: CreateOrderAction
        },
        updateOrder: {
            perform: UpdateOrderAction
        },
        deleteOrder: {
            perform: DeleteOrderAction
        }
    },
    selectors: {
        resource: {
            getResource: GetOrders
        },
        getOrders: {
            request: {
                getResource:    getResourceGetOrders,
                getMetadata:    getMetadataGetOrders,
                couldPerform:   couldPerformGetOrders,
                isPerforming:   isPerformingGetOrders,
                hasSucceeded:   hasSucceededGetOrders,
                hasFailed:      hasFailedGetOrders,
                isValid:        isValidGetOrders,
            }
        },
        createOrder: {
            request: {
                isPerforming: isCreateOrder
            }
        },
        updateOrder: {
            request: {
                isPerforming: isUpdateOrder
            }
        },
        deleteOrder: {
            request: {
                isPerforming: isDeleteOrder
            }
        }
    }
} = order

export {
    GetOrdersAction,
    CreateOrderAction,
    UpdateOrderAction,
    DeleteOrderAction,
    GetOrders,
    getResourceGetOrders,
    getMetadataGetOrders,
    couldPerformGetOrders,
    isPerformingGetOrders,
    hasSucceededGetOrders,
    hasFailedGetOrders,
    isValidGetOrders,
    isCreateOrder,
    isUpdateOrder,
    isDeleteOrder,
    ResetOrders
}