import {createResource} from '@brigad/redux-rest-easy'
import normalize from 'json-api-normalizer'
import {getToken} from './networkHelpers/getToken'

const store = createResource('store', {cacheLifetime: 0})({
    getStore: {
        method: 'GET',
        url: '/api/v1/stores',
        afterHook: () => console.log('Get stores successfully'),
        normalizer: response => {
            console.log('response', response);

            let store = normalize(response).stores;

            if (!store) {
                return {}
            }
            store = Object.values(store).map(item => ({
                id: item.id,
                address: item.attributes.address,
                name: item.attributes.name,
                workinghours: JSON.parse(item.attributes.workinghours),
                createdAt: item.attributes.createdAt.date,
                updatedAt: item.attributes.updatedAt.date
            }));

            let data = {
                entities: {store: {}},
                result: store.map(item => item.id)
            }
            store.forEach(element => {
                data.entities.store[element.id] = element
            })

            return data
        },
        networkHelpers: {
            getToken: getToken,
            async requestGET() {
                let CurrentUser = await this.getToken().then(res => res)
                console.log('CurrentUser', CurrentUser)
                return {
                    headers: {
                        Accept: 'application/json',
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${CurrentUser.access_token}`
                    }
                }
            }
        }
    },
    createStore: {
        method: 'POST',
        url: '/api/v1/store/',
        afterHook: () => console.log('POST stores successfully'),
        normalizer: response => {
            console.log('PUT response', response)
            let store = response
            store.workinghours = JSON.parse(store.workinghours)

            let data = {
                entities: {
                    store: {
                        [store.id]: store
                    }
                },
                result: [store.id]
            }
            console.log('data', data)

            return data
        },
        networkHelpers: {
            getToken: getToken,
            async requestPOST(body) {
                let CurrentUser = await this.getToken().then(res => res)
                console.log('createStore: ', body)
                return {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                      'Content-type': 'application/json',
                        Authorization: `Bearer ${CurrentUser.access_token}`
                    },
                    body: JSON.stringify(body)
                }
            }
        }
    },
    updateStore: {
        method: 'PUT',
        url: '/api/v1/store/::id',
        afterHook: () => console.log('PUT stores successfully'),
        normalizer: response => {
            console.log('PUT response', response)
            let store = response
            store.workinghours = JSON.parse(store.workinghours)

            let data = {
                entities: {
                    store: {
                        [store.id]: store
                    }
                },
                result: [store.id]
            }
            console.log('data', data)

            return data
        },
        networkHelpers: {
            getToken: getToken,
            async requestPUT(body) {
                let CurrentUser = await this.getToken().then(res => res)
                return {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${CurrentUser.access_token}`
                    },
                    body: JSON.stringify(body)
                }
            }
        }
    },
    deleteStore: {
        method: 'DELETE',
        url: '/api/v1/store/::id',
        afterHook: (
            normalizedPayload,
            urlParams,
            query,
            body,
            otherArgs,
            dispatch
        ) => {
            console.log('DELETE stores normalizedPayload', normalizedPayload)
            console.log('DELETE stores urlParams', urlParams)
            console.log('DELETE stores query', query)
            console.log('DELETE stores body', body)
            console.log('DELETE stores otherArgs', otherArgs)
            console.log('DELETE stores dispatch', dispatch)

            console.log('DELETE stores successfully', arguments)
        },
        networkHelpers: {
            getToken: getToken,
            async requestDELETE() {
                let CurrentUser = await this.getToken().then(res => res)
                return {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${CurrentUser.access_token}`
                    }
                }
            }
        }
    }
})

const {
    actions: {
        resource: {
            invalidate: invalidateUsers,
            invalidateId: invalidateUser,
            reset: ResetStores
        },
        getStore: {
            perform: GetStoreAction
        },
        createStore: {
            perform: CreateStoreAction
        },
        updateStore: {
            perform: UpdateStoreAction
        },
        deleteStore: {
            perform: DeleteStoreAction
        }
    },
    selectors: {
        resource: {
            getResource: getStore
        },
        getStore: {
            request: {
                getResource:    getResourceGetStore,
                getMetadata:    getMetadataGetStore,
                couldPerform:   couldPerformGetStore,
                isPerforming:   isPerformingGetStore,
                hasSucceeded:   hasSucceededGetStore,
                hasFailed:      hasFailedGetStore,
                isValid:        isValidGetStore,
            }
        },
        createStore: {
            request: {
                isPerforming: isCreateStore
            }
        },
        updateStore: {
            request: {
                isPerforming: isUpdateStore
            }
        },
        deleteStore: {
            request: {
                isPerforming: isDeleteStore
            }
        }
    }
} = store

export {
    GetStoreAction,
    CreateStoreAction,
    UpdateStoreAction,
    DeleteStoreAction,
    getStore,
    getResourceGetStore,
    getMetadataGetStore,
    couldPerformGetStore,
    isPerformingGetStore,
    hasSucceededGetStore,
    hasFailedGetStore,
    isValidGetStore,
    isCreateStore,
    isUpdateStore,
    isDeleteStore,
    ResetStores
}
