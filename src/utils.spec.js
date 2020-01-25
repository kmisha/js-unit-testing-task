import {buildUrl} from './utils.js';

describe('buildUrl', () => {
    it('should construct correct string from correct config object', () => {
        const config = JSON.parse(`
        {
            "proto"    : "https",
            "url"      : "randomuser.me/api/?",
            "params"   : {
                "results"  : "50",
                "format"   : "json",
                "nat"      : "us",
                "gender"   : "",
                "password" : "",
                "inc"      : "gender,name,location,email,phone,picture"
            }
        }
        `);

        expect(buildUrl(config.proto, config.url, config.params)).toBe('https://randomuser.me/api/?results=50&format=json&nat=us&gender=&password=&inc=gender,name,location,email,phone,picture')
    });

    it('should throw TypeError exception if proto or url are not provided', () => {
        expect(() => buildUrl()).toThrowError(TypeError);
    });

    it('should throw TypeError exception if url is not provided', () => {
        expect(() => buildUrl('http')).toThrowError(TypeError);
    });

    it('should return correct URI if params is not provided', () => {
        const proto = 'http';
        const url = 'yandex.ru';
        expect(buildUrl(proto, url)).toBe('http://yandex.ru');
    });

    it('should throw TypeError exception if params is not object', () => {
        const proto = 'http';
        const url = 'yandex.ru';
        expect(() => buildUrl(proto, url, [])).toThrowError(TypeError);
    });
});
