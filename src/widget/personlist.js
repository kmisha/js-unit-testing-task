import {buildUrl} from '../utils';

export default class PersonList {

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

    getPersons(from, to) {
        return this.personList.slice(from - 1, to - 1);
    }
}
