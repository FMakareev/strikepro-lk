// users.js

import {createResource} from '@brigad/redux-rest-easy';
import { config } from "../../config";

export const createUser = createResource('createUser')({
    register: {
        method: 'POST',
        url: `${config.api.baseUrl}/api/v1/auth/register`,
        afterHook: () => console.log('User create successfully'),
        networkHelpers: {
            requestPOST: (body) => ({
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }),
            handleStatusCode: response => {
                console.log('handleStatusCode: ',response);
                if (response) {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    }

                    const error = new Error(response.statusText);
                    error.response = response;
                    throw error;
                }

                return null;
            },
            handleError: async (err, dispatch) => {
                try {
                    if (err && err.response) {
                        const error = await err.response.json();

                        // dispatch some action to warn the user about the error

                        // eslint-disable-next-line no-console
                        console.error('handleError: ',error);
                    } else {
                        // eslint-disable-next-line no-console
                        console.error('handleError: ',err);
                    }
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.error('handleError: ',e);
                }
            }
        }
    }
});
console.log('createUser: ', createUser);
const {
    actions: {
        register: {
            perform: CreateUserAction
        },
    },
    selectors: {
        resource: {getResource: getCreateUser},
        register: {
            request: {
                isPerforming: isCreateUser
            },
        },
    },
} = createUser;

export {CreateUserAction, getCreateUser, isCreateUser};
//

export default createUser;
