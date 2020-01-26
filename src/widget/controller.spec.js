import Controller from "./controller.js";

describe('Controller', () => {
    let model = jasmine.createSpyObj('Model', ['updateData', 'sort', 'reverse', 'getPersons', 'getRanges', 'setActiveRange', 'getPage', 'setPage']),
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

            controller.sortEvent(event, callbackSpy)

            expect(model.getPersons).toHaveBeenCalledWith(callbackSpy)
        })
    })

    describe('when fired getRangeEvent', () => {

        beforeEach(() => {
            callbackSpy = jasmine.createSpy('callback spy')
        })

        it('should call the getRanges method with correct argument', () => {
            controller.getRangesEvent(callbackSpy)
            expect(model.getRanges).toHaveBeenCalledWith(callbackSpy)
        })
    })

    describe('when fired setActiveRangeEvent', () => {

        beforeEach(() => {
            callbackSpy = jasmine.createSpy('callback spy')
        })

        it('should call the setActiveRanges method with correct argument', () => {
            controller.setActiveRangeEvent(10, callbackSpy)
            expect(model.getRanges).toHaveBeenCalledWith(callbackSpy)
            expect(model.setActiveRange).toHaveBeenCalledWith(10)
        })
    })

    describe('when fired getPageEvent', () => {

        beforeEach(() => {
            callbackSpy = jasmine.createSpy('callback spy')
        })

        it('should call the getPersons method with correct arguments', () => {
            controller.getPageEvent(callbackSpy)
            expect(model.getPage).toHaveBeenCalledWith(callbackSpy)
        })
    })

    describe('when fired setPageEvent', () => {

        beforeEach(() => {
            callbackSpy = jasmine.createSpy('callback spy')
        })

        it('should call the setPage method with correct arguments', () => {
            controller.setPageEvent(10, callbackSpy)
            expect(model.getPage).toHaveBeenCalledWith(callbackSpy)
            expect(model.setPage).toHaveBeenCalledWith(10)
        })
    })

    describe('when fired showListEvent', () => {

        beforeEach(() => {
            callbackSpy = jasmine.createSpy('callback spy')
        })

        it('should call the getPersons method with correct arguments', () => {
            controller.showListEvent(callbackSpy)
            expect(model.getPersons).toHaveBeenCalledWith( callbackSpy)
        })
    })
});
