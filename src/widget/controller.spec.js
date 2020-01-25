import Controller from "./controller.js";

describe('Controller', () => {
    let widget, config;
    const list = jasmine.createSpyObj('PersonList', ['updateData', 'sort', 'reverse', 'getPersons']);
    const view = jasmine.createSpyObj('PersonView', ['showRanges', 'showPages', 'showList', 'setRangeActive', 'setPageActive', 'showFullInfo', 'setSortSelector']);
    view.container = jasmine.createSpyObj('DOMElement', ['querySelector', 'addEventListener']);

    beforeEach(() => {
        config = {proto: 'http', url: 'yandex.ru'};
    });

    it('should has correct personList if API request was successful', (done) => {
        list.updateData.and.callFake(() => Promise.resolve([{a: 1}]));

        widget = new Controller(view, list);
        widget.compile([1, 2, 3])
            .then(() => {
                expect(widget.list.personList).toEqual([{a: 1}]);
                done();
            })
    });
});
