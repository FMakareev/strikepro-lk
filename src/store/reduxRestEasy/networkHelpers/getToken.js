import {Store} from '../../store';
import {BrowserHistory} from "../../../history";
import {RefreshToken} from "../login";


export const getToken = async function () {
    console.log(this);

    let CurrentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    console.log('CurrentUser: ', CurrentUser);
    console.log('Date: ', Date.now());
    if (!CurrentUser) {
        BrowserHistory.push('/login');
        localStorage.clear();
        throw new Error('Пользователь не авторизован.');
    }

    if (CurrentUser.expireAt <= Date.now()) {
        await
            Store.dispatch(RefreshToken({
                body: {
                    refresh_token: CurrentUser.refresh_token,
                }
            }))
                .then(response => {
                    console.log('response RefreshToken:', response);
                    CurrentUser = JSON.parse(localStorage.getItem('CurrentUser'));
                    return response;
                })
                .catch(err => {
                    console.log('err RefreshToken:', err);
                    BrowserHistory.push('/login');
                    throw new Error(err);
                });
    }

    console.log('return CurrentUser: ', CurrentUser);
    return CurrentUser
};

export default getToken;