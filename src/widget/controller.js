export default class Controller{
    constructor(model) {
        this.model = model
    }

    // select list sorting
    sortEvent(event, page, range, callback) {
        switch( event.currentTarget.value ) {
            case 'normal' :
                this.model.sort();
                break;
            case 'reverse' :
                this.model.reverse();
                break;
        }

        const from = (page - 1) * range + 1
        const to = from + range
        this.model.getPersons(from, to, callback)
    }

    rangeEvent(range, callback) {
        this.model.getPersons(1, range + 1, callback)
    }

    pageEvent(page, range,  callback) {
        const from = (page - 1) * range + 1
        const to = from + range
        this.model.getPersons(from, to, callback)
    }

    showListEvent(from, to, callback) {
        this.model.getPersons(from, to, callback);
    }
}
