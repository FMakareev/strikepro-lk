import {formValueSelector} from 'redux-form'
import {Store} from '../../../store/store';
export const required = value => {
    return value && value.length > 0 ? undefined : 'Обязательно для заполнения'
};

export const maxLength32 = value => value && value.length > 32 ? `Максимальное кол-во знаков ${32}` : undefined;
export const maxLength255 = value => value && value.length > 255 ? `Максимальное кол-во знаков ${255}` : undefined;
export const maxLength1000 = value => value && value.length > 1000 ? `Максимальное кол-во знаков ${1000}` : undefined;

export const minLength6 = value => value && value.length < 6 ? `Минимальное кол-во знаков ${6}` : undefined;
export const minLength9 = value => value && value.length < 9 ? `Минимальное кол-во знаков ${9}` : undefined;
export const minLength10 = value => value && value.length < 10 ? `Минимальное кол-во знаков ${10}` : undefined;
export const minLength13 = value => value && value.length < 13 ? `Минимальное кол-во знаков ${13}` : undefined;

export const isNumber = value =>
    value && isNaN(Number(value)) ? 'Это поле содержит только цифры' : undefined;


export const webSite = value => {

    const protocol = new RegExp('^(https?:\\/\\/)');

    if (!protocol.test(value)) {
        return 'Адрес должен начинатся на http:// или https://.'
    }

    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

    return pattern.test(value) ? undefined : 'Некоректный адресс.';

};

export const isEmail = value => {
    const reg = new RegExp(/^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i);
    return reg.test(value) ? undefined : 'Некоректный email.';

};


export const isPassword = value => {
    const selector = formValueSelector('FormRegister');
    const password = selector(Store.getState(), 'company.user.password');
    const password_confirmation = selector(Store.getState(), 'company.user.password_confirmation');

    if(!password) return undefined;
    if(!password_confirmation) return undefined;
    if(!password && !password_confirmation) return undefined;

    return password !== password_confirmation ? 'Пароли не совпадают' : undefined;
}

