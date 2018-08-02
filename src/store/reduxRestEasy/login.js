// users.js

import {createResource} from '@brigad/redux-rest-easy';
import {normalize} from "normalizr";
import {LoginSchema} from "./schemas/LoginSchema";
import {BrowserHistory} from "../../history";



export const login = createResource('login', {cacheLifetime: 600})({
    login: {
        method: 'POST',
        url: '/api/v1/auth/login',
        afterHook: () => console.log('User login successfully'),
        normalizer: (response) => normalize(response, LoginSchema),

        networkHelpers: {
            requestPOST: (body) => ({
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
        }
    },
    refreshToken: {
        method: 'POST',
        url: '/api/v1/auth/refresh_token',
        afterHook: () => console.log('refresh_token successfully'),
        normalizer: (response) => {
            console.log('refresh_token response normalizer: ', response);
            return normalize(response, LoginSchema)
        },
        networkHelpers: {
            requestPOST: (body) => ({
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
        }
    },
    logOut: {
        method: 'GET',
        url: '/api/v1/auth/logout',
        afterHook: () => {
            BrowserHistory.push('/login');
            localStorage.clear();
            console.log('user logout successfully');
        },
    }
});
console.log('login: ', login);
const {
    actions: {
        login: {
            perform: UserLogin,
        },
        logOut: {
            perform: UserLogOut,
        },
        refreshToken: {
            perform: RefreshToken,
        },
    },
    selectors: {
        resource: {getResource: getUser},
        login: {
            request: {
                isPerforming: isLogin,
            },
        },
        logOut: {
            request: {
                isPerforming: isLogOut,
            },
        },
        refreshToken: {
            request: {
                isPerforming: isRefreshToken
            },
        },
    },
} = login;


export {
    UserLogin,
    UserLogOut,
    getUser,
    isLogOut,
    RefreshToken,
    isRefreshToken,
    isLogin,
};
//

export default login;