import {buildUrl} from '../utils.js';

export default class Model {

    constructor(config) {
        this.url = buildUrl(config.proto, config.url, config.params)
        this.personList = []
        this.ranges = config.ranges
        this.activePage = 1
        this.activeRange = this.ranges[0]
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

    async getPersons(callback) {

        try {

            if (!this.personList.length) {
                this.personList = await this.updateData()
                this.pages = this.calcPages_(this.personList.length, this.activeRange)
                this.sort()
            }

            const from = this.activeRange * (this.activePage - 1),
                to = from + this.activeRange

            console.log(from, to)
            callback(false, this.personList.slice(from, to))
        } catch (error) {
            callback(error, [])
        }

    }

    calcPages_(amount, range) {
        return !(amount % range) ? amount / range : Math.floor( amount / range ) + 1;
    }

    getRanges(callback) {
        callback(this.ranges, this.activeRange);
    }

    setActiveRange(range) {
        this.activeRange = range
        this.activePage = 1
    }

    getPage(callback) {
        callback(this.pages, this.activePage)
    }

    setPage(page) {
        this.activePage = page
    }
}
