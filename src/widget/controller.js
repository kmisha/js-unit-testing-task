export default class Controller{
    constructor(model) {
        this.model = model
    }

    sortEvent(event, callback) {
        switch( event.currentTarget.value ) {
            case 'normal' :
                this.model.sort();
                break;
            case 'reverse' :
                this.model.reverse();
                break;
        }
        this.model.getPersons(callback)
    }

    getPageEvent(callback) {
        this.model.getPage(callback)
    }

    setPageEvent(page, callback) {
        this.model.setPage(page)
        this.getPageEvent(callback)
    }

    showListEvent(callback) {
        this.model.getPersons(callback);
    }

    getRangesEvent(callback) {
        this.model.getRanges(callback)
    }

    setActiveRangeEvent(range, callback) {
        this.model.setActiveRange(range)
        this.getRangesEvent(callback)
    }
}
