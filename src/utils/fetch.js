export const is_fetch = (url) => (fetch(url, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-cache',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
}).then(response => {
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    }
    return Promise.reject(response);
}).then((response) => {
    return response.json()
}).then((response) => {
    return response
}).catch(error => {
    console.log(error);
    return error;
}))