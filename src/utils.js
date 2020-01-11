const isObject = obj => !!obj && obj.constructor === Object;

// Make URI from config for request
export const buildUrl = (proto, url, params = {}) => {
    if (!proto) {
        throw new TypeError('Protocol is required')
    }

    if (!url) {
        throw new TypeError('Url is required')
    }

    if (!isObject(params)) {
        throw new TypeError('params should be object')
    }

    const result = `${proto}://${url}`;
    let paramsArray = [];

    for (let key in params) {
        paramsArray = [...paramsArray, `${key}=${params[key]}`];
    }

    return result + paramsArray.join('&');
};
