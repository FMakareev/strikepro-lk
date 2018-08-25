import {createResource} from "@brigad/redux-rest-easy/dist/redux-rest-easy.es";
import {getToken} from "./networkHelpers/getToken";


const order = createResource('order')({
    getOrders: {
        method: 'GET',
        url: 'http://new.strikepro.ru/api/v1/orders',
        afterHook: () => console.log('Get stores successfully'),
        networkHelpers: {
            getToken: getToken,
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
        networkHelpers: {
            getToken: getToken,
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