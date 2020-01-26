import Model from './model.js';

describe('Model', () => {
    let config = {
        proto: 'http',
        url: 'yandex.ru',
        ranges: [2]
    }, model

    beforeEach(() => {
        model = new Model(config)
    })

    it('should have a personList property', () => {
        expect(model.personList).toEqual([])
    })

    it('should has correct url property', () => {
        expect(model.url).toMatch(/\w{4}:\/\/\w+\.\w{2}/)
    })
});

describe('Model method updateData', () => {
    let config = {
        proto: 'http',
        url: 'yandex.ru',
        ranges: [2]
    }, model, thenSpy

    beforeEach(() => {
        model = new Model(config)
        jasmine.Ajax.install()
        jasmine.clock().install()
        thenSpy = jasmine.createSpy('spy')
    })

    afterEach(() => {
        jasmine.Ajax.uninstall()
        jasmine.clock().uninstall()
    })

    it('should make request with correct URL and get some response', done => {
        model.updateData().finally(done)

        expect(jasmine.Ajax.requests.mostRecent().url).toBe('http://yandex.ru')
        jasmine.Ajax.requests.mostRecent().respondWith({
            status: 200,
            responseText: 'success'
        })
    })

    it('should return promise in rejected state with empty object if request encountered an error', done => {
        model.updateData()
            .then(thenSpy)
            .catch(error => expect(error).toEqual('error'))
            .finally(() => {
                expect(thenSpy).not.toHaveBeenCalled()
                done()
            })

        jasmine.Ajax.requests.mostRecent().responseError()
    });

    it('should return promise in rejected state with empty object if request returns timout error', done => {
        model.updateData()
            .then(thenSpy)
            .catch(msg => expect(msg).toEqual('timeout'))
            .finally(() => {
                expect(thenSpy).not.toHaveBeenCalled()
                done()
            })

        jasmine.Ajax.requests.mostRecent().responseTimeout()
    });

    it('should return promise in rejected state with empty object if request returns not 200 status code', (done) => {
        model.updateData()
            .then(thenSpy)
            .catch(msg => expect(msg).toEqual(404))
            .finally(() => {
                expect(thenSpy).not.toHaveBeenCalled()
                done()
            })

        jasmine.Ajax.requests.mostRecent().respondWith({
            status: 404,
            responseText: 'bad response'
        })
    })
});

describe('Model method getPersons', () => {
    let config = {
        proto: 'http',
        url: 'yandex.ru',
        ranges: [2]
    }, model, callback, errorSpy

    beforeEach(() => {
        model = new Model(config)
        callback = jasmine.createSpy('callback')
        errorSpy = jasmine.createSpy('rejected event')
        jasmine.Ajax.install()
    });

    afterEach(() => {
        jasmine.Ajax.uninstall()
    });


    it('should call callback with correct data', async () => {
        model.personList = [
            {name: 'Person1'},
            {name: 'Person2'},
            {name: 'Person3'},
            {name: 'Person4'},
            {name: 'Person5'},
        ]
        const expected = [
            {name: 'Person3'},
            {name: 'Person4'},
        ]

        model.setActiveRange(2)
        model.setPage(2)

        await model.getPersons(callback)

        expect(callback).toHaveBeenCalledWith(false, expected)
    })

    it('should call callback with correct data also if model list is empty', (done) => {
        const expected = [
            {name: 'Person3'},
            {name: 'Person4'},
        ]

        model.setActiveRange(2)
        model.setPage(2)
        model.getPersons(callback)
            .then(() => expect(callback).toHaveBeenCalledWith(false, expected))
            .catch(errorSpy)
            .finally(() => {
                expect(errorSpy).not.toHaveBeenCalled()
                done()
            })

        jasmine.Ajax.requests.mostRecent().respondWith({
            status: 200,
            response: {
                results: [
                    {name: 'Person1'},
                    {name: 'Person2'},
                    {name: 'Person3'},
                    {name: 'Person4'},
                    {name: 'Person5'},
                ]
            }
        });
    })

    it('should call callback with [] if we have problems with network', (done) => {
        model.getPersons(callback)
            .then(() => done())
            .finally(() => {
            expect(callback).toHaveBeenCalledWith('error', []);
        })

        jasmine.Ajax.requests.mostRecent().responseError('error')
    })
});

describe('Model method reverse', () => {
    let config = {
        proto: 'http',
        url: 'yandex.ru',
        ranges: [2]
    };
    let person;

    beforeEach(() => {
        person = new Model(config, {});
    });

    it('should reverse', () => {
        person.personList = [
            {name: 'Person1'},
            {name: 'Person2'},
            {name: 'Person3'},
            {name: 'Person4'},
            {name: 'Person5'},
        ];
        const expected = [
            {name: 'Person5'},
            {name: 'Person4'},
            {name: 'Person3'},
            {name: 'Person2'},
            {name: 'Person1'},
        ];

        person.reverse();

        expect(person.personList).toEqual(expected);
    })
});
