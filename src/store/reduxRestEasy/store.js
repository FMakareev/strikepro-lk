import {normalize} from "normalizr";
import {createResource,} from '@brigad/redux-rest-easy';
import {getToken} from "./networkHelpers/getToken";
import login from "./login";

const store = createResource('store')({
    getStore: {
        method: 'GET',
        url: 'http://new.strikepro.ru/api/v1/stores',
        afterHook: () => console.log('Get stores successfully'),
        networkHelpers: {
            getToken: getToken,
            async requestGET() {
                let CurrentUser = await this.getToken().then(res => res);
                return {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${CurrentUser.access_token}`,
                    },
                };
            },
        },
    },
    createStore: {
        method: 'POST',
        url: 'http://new.strikepro.ru/api/v1/store/',
        afterHook: () => console.log('Get stores successfully'),
        networkHelpers: {
            getToken: getToken,
            async requestPOST(body) {
                let CurrentUser = await this.getToken().then(res => res);
                console.log('createStore: ',body);
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
    updateStore: {
        method: 'PUT',
        url: 'http://new.strikepro.ru/api/v1/store/::id',
        afterHook: () => console.log('Get stores successfully'),
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
    deleteStore: {
        method: 'DELETE',
        url: 'http://new.strikepro.ru/api/v1/store/::id',
        afterHook: () => console.log('Get stores successfully'),
        networkHelpers: {
            getToken: getToken,
            async requestDELETE() {
                let CurrentUser = await this.getToken().then(res => res);
                return {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${CurrentUser.access_token}`,
                    },
                };
            },
        },
    },
});

const {
    actions: {
        getStore: {
            perform: GetStoreAction,
        },
        createStore: {
            perform: CreateStoreAction,
        },
        updateStore: {
            perform: UpdateStoreAction,
        },
        deleteStore: {
            perform: DeleteStoreAction,
        },
    },
    selectors: {
        resource: {
            getResource: getStore
        },
        getStore: {
            request: {
                isPerforming: isGetStore,
            },
        },
        createStore: {
            request: {
                isPerforming: isCreateStore,
            },
        },
        updateStore: {
            request: {
                isPerforming: isUpdateStore,
            },
        },
        deleteStore: {
            request: {
                isPerforming: isDeleteStore,
            },
        },
    },
} = store;

export {
    GetStoreAction,
    CreateStoreAction,
    UpdateStoreAction,
    DeleteStoreAction,
    getStore,
    isGetStore,
    isCreateStore,
    isUpdateStore,
    isDeleteStore,
}