import Controller from "./controller.js";

describe('Controller', () => {
    let model = jasmine.createSpyObj('Model', ['updateData', 'sort', 'reverse', 'getPersons']),
        controller, callbackSpy

    beforeEach(() => {
        controller = new Controller(model)
    })

    it('should create a correct object', () => {
        expect(controller).toBeDefined()
    })

    describe('when fired sortEvent', () => {

        beforeEach(() => {
            callbackSpy = jasmine.createSpy('callback function')
        })

        it('should call a correct sort function if event came with default sort', () => {
            const event = {
                currentTarget: {
                    value: 'normal'
                }
            }

            controller.sortEvent(event, 1, 2, callbackSpy)

            expect(model.sort).toHaveBeenCalled()
        })

        it('should call a correct reverse function if event came with reverse sort', () => {
            const event = {
                currentTarget: {
                    value: 'reverse'
                }
            }

            controller.sortEvent(event, 1, 2, callbackSpy)

            expect(model.reverse).toHaveBeenCalled()
        })

        it('should call the getPersons function with correct ', () => {
            model.personList = [{a: 1}]
            const event = {
                currentTarget: {
                    value: 'sort'
                }
            }

            controller.sortEvent(event, 1, 2, callbackSpy)

            expect(model.getPersons).toHaveBeenCalledWith(1, 3, callbackSpy)
        })
    })

    describe('when fired rangeEvent', () => {

        beforeEach(() => {
            callbackSpy = jasmine.createSpy('callback spy')
        })

        it('should call the getPersons method with correct arguments', () => {
            controller.rangeEvent(10, callbackSpy)
            expect(model.getPersons).toHaveBeenCalledWith(1, 11, callbackSpy)
        })
    })

    describe('when fired pageEvent', () => {

        beforeEach(() => {
            callbackSpy = jasmine.createSpy('callback spy')
        })

        it('should call the getPersons method with correct arguments', () => {
            controller.pageEvent(10, 2, callbackSpy)
            expect(model.getPersons).toHaveBeenCalledWith(19, 21, callbackSpy)
        })
    })

    describe('when fired showListEvent', () => {

        beforeEach(() => {
            callbackSpy = jasmine.createSpy('callback spy')
        })

        it('should call the getPersons method with correct arguments', () => {
            controller.showListEvent(10, 12, callbackSpy)
            expect(model.getPersons).toHaveBeenCalledWith(10, 12, callbackSpy)
        })
    })
});
