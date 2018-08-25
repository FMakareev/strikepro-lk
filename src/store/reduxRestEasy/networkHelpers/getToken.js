import {Store} from '../../store';
import {BrowserHistory} from "../../../history";
import {RefreshToken} from "../login";

/**
 * @return {object} возвращает объект пользователя в котором хранится: access_token, expireAt, expires_in, refresh_token, startedAt, token_type
 * @desc метод получает из локального хранилища токен
 * */
export const getToken = async function () {

    let CurrentUser = JSON.parse(localStorage.getItem('CurrentUser'));

    /** @desc если пользователя нет то пользователя отправляет на страницу авторизации */
    if (!CurrentUser) {
        BrowserHistory.push('/login');
        localStorage.clear();
        throw new Error('Пользователь не авторизован.');
    }

    /** @desc если срок действия токена доступа истек то он автоматически обновляется */
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

    return CurrentUser
};

export default getToken;