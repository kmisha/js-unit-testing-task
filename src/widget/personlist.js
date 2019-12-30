// Make URI from config for request
function buildUrl(config) {
    let result = `${config.proto}://${config.url}`;
    for(let key in config.params) {
        result += `${key}=${config.params[key]}&`;
    }
    // return URI without last &
    return result.slice(0,result.length - 1);
}
//
export default class PersonList {

    constructor(config, view) {
        this.url = buildUrl(config);
        this.view = view;
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

            xhr.onreadystatechange = () => {
                if(xhr.readyState !== 4) return;
                if(xhr.status !== 200) {
                    console.log(`${xhr.status}: ${xhr.statusText}`);
                } else {
                    resolve(xhr.response.results);
                }
            };
            xhr.ontimeout = () => {
                console.log( 'Извините, запрос превысил максимальное время' );
                // TODO update view
                reject('timeout');
            };
            xhr.onerror = (error) => {
                console.log(`Error: ${error}`);
                // TODO update view
                reject(error);
            };
            xhr.send();
        });
    }
    update() {
        // Calc count pages
        const start = this.page * this.range,
              end   = start + this.range;
        this.view.showList(this.personList.slice(start, end));
    }
}
