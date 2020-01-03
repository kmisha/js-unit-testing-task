// Make URI from config for request
export const buildUrl = config => {
    let result = `${config.proto}://${config.url}`;
    for(let key in config.params) {
        result += `${key}=${config.params[key]}&`;
    }
    // return URI without last &
    return result.slice(0,result.length - 1);
};
