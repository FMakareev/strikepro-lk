import {schema} from "normalizr";


export const LoginSchema = new schema.Entity(
    "login",
    {},
    {
        processStrategy: (value, parent, key) => {
            console.log(value);
            /** началось в */
            value.startedAt = Date.now();
            /** закончилось в */
            value.expireAt = Date.now() + value.expires_in * 1000 - 100000;
            localStorage.setItem('CurrentUser', JSON.stringify(value));
            return value;
        }
    }
);

export default LoginSchema;