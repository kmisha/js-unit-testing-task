import PersonList from './personlist.js';
import PersonView from './personview.js';

// config: configuration for URI
// container: DOM element for widget
// ranges: array for peginations
export default class PersonWidget{
    constructor(config, container, ranges) {
        this.view = new PersonView(container);
        this.list = new PersonList(config, this.view);
        this.list.updateData()
            .then( result => {
                this.list.personList = result;
                this.list.sort();
                this.setRanges(ranges);
                this.list.update();
                this.view.sortSelector.addEventListener('change',(event) => this.sort(event));
            })
            .catch( error => {
                this.list.personList = [];
                // TODO Show Error
            });
    }
    // update view
    update() {
        this.list.update();
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
        this.list.update()
    }
    setRanges(arr) {
        this.list.range = this.view.showRanges(arr, this);
        this.list.page  = this.view.showPages(this.calcPages(), this);
    }
    setRangeEvent(range, event) {
        this.list.range = range;
        this.view.setRangeActive(event.currentTarget);
        this.list.page  = this.view.showPages(this.calcPages(), this);
        this.list.update();
    }
    setPageEvent(page, event) {
        this.list.page = page;
        this.view.setPageActive(event.currentTarget);
        this.list.update();
    }
    calcPages() {
        const personCount = this.list.personList.length,
              range       = this.list.range;
        let countPage = 0;
        if( !(personCount % range) ){
            countPage = personCount / range;
        } else {
            countPage = Math.floor( personCount / range ) + 1;
        }
        return countPage;
    }
}
