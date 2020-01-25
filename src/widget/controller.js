export default class Controller{
    constructor(view, list) {
        this.view = view;
        this.list = list;
        this.page = 1;
    }
    // update view
    update(page) {
        const first = page * this.list.range,
            last = first + this.list.range;
        const users = this.list.getPersons(first, last);
        this.view.showList(users);
    }
    // select list sorting
    sort(event) {
        switch( event.currentTarget.value ) {
            case 'normal' :
                this.list.sort();
                break;
            case 'reverse' :
                this.list.reverse();
                break;
        }
        this.update(this.page)
    }

    setRanges(arr) {
        this.list.range = this.view.showRanges(arr, this);
        this.list.page  = this.view.showPages(this.calcPages(), this);
    }

    setRangeEvent(range, event) {
        this.list.range = range;
        this.view.setRangeActive(event.currentTarget);
        this.list.page = this.view.showPages(this.calcPages(), this);
        this.update(this.list.page, range);
    }

    setPageEvent(page, event) {
        this.list.page = page;
        this.view.setPageActive(event.currentTarget);
        this.update();
    }

    calcPages() {
        const personCount = this.list.personList.length,
              range       = this.list.range;
        return !(personCount % range) ? personCount / range : Math.floor( personCount / range ) + 1;
    }

    compile(ranges) {
        return this.list.updateData()
            .then( result => {
                this.list.personList = result;
                this.list.sort();
                this.setRanges(ranges);
                this.update(1);
                this.view.setSortSelector();
            })
            .catch( () => {
                this.list.personList = [];
                // TODO Show Error
            });
    }

    showList(from, to, callback) {
        this.model.showList(from, to, callback);
    }
}
