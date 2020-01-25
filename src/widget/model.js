import {buildUrl} from '../utils.js';

export default class Model {

    constructor(config) {
        this.url = buildUrl(config.proto, config.url, config.params);
        this.personList = [];
    }

    sort() {
        this.personList.sort( (person_a, person_b) => {
            const name_a = `${person_a.name.first} ${person_a.name.last}`;
            const name_b = `${person_b.name.first} ${person_b.name.last}`;
            return name_a.localeCompare(name_b);
        });
    }

    reverse() {
        this.personList.reverse();
    }

    updateData() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET',this.url, true);
            xhr.responseType = 'json';

            xhr.onloadend = () => {
                if (xhr.status === 200) {
                    resolve(xhr.response.results);
                } else {
                    reject(xhr.status);
                }
            };
            xhr.ontimeout = () => {
                // TODO update view
                reject('timeout');
            };
            xhr.onerror = () => {
                // TODO update view
                reject('error');
            };
            xhr.send();
        });
    }

    async getPersons(from, to, callback) {
        try {

            if (from < 1 || to < 1 || to < from) {
                callback(new TypeError('from and to should be more than 1 and to < from'), [])
            }

            if (!this.personList.length) {
                this.personList = await this.updateData()
            }

            callback(false, this.personList.slice(from - 1, to - 1))
        } catch (error) {
            callback(error, [])
        }

    }
}
