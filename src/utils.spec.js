import {buildUrl} from './utils';

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

        expect(buildUrl(config)).toBe('https://randomuser.me/api/?results=50&format=json&nat=us&gender=&password=&inc=gender,name,location,email,phone,picture')
    });

    it('should return empty string if config object is empty', () => {
        const config = {};
        expect(buildUrl(config)).toBe('');
    });

    it('should return empty string if config object is null', () => {
        expect(buildUrl(null)).toBe('');
    });

    it('should return empty string if config object is undefined', () => {
        expect(buildUrl()).toBe('');
    })
});
