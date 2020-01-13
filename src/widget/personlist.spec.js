import PersonList from './personlist';
import 'jasmine-ajax';

describe('PersonList', () => {
    let config = {
        proto: 'http',
        url: 'yandex.ru'
    };
    let person;

    beforeEach(() => {
        person = new PersonList(config, {});
    });

    it('should create a object', () => {
        expect(person).not.toBeUndefined();
        expect(person).not.toBeNull();
    });

    it('should have a personList property', () => {
        expect(person.personList).toBeDefined();
        expect(person.personList).toEqual([]);
    });
});

describe('PersonList method updateData', () => {
    let config = {
        proto: 'http',
        url: 'yandex.ru'
    };
    let person;

    beforeEach(() => {
        person = new PersonList(config, {});
        jasmine.Ajax.install();
        jasmine.clock().install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
        jasmine.clock().uninstall();
    });

    it('should make request with correct URL and get some response', done => {
        person.updateData().finally(done);
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('http://yandex.ru');
        jasmine.Ajax.requests.mostRecent().respondWith({
            status: 200,
            responseText: 'success'
        })
    });

    it('should return promise in rejected state with empty object if request encountered an error', (done) => {
        const thenSpy = jasmine.createSpy('spy');

        person.updateData()
            .then(thenSpy)
            .catch(error => expect(error).toEqual('error'))
            .finally(() => {
                expect(thenSpy).not.toHaveBeenCalled();
                done();
            });

        jasmine.Ajax.requests.mostRecent().responseError();
    });

    it('should return promise in rejected state with empty object if request returns timout error', (done) => {
        const thenSpy = jasmine.createSpy('spy');

        person.updateData()
            .then(thenSpy)
            .catch(msg => expect(msg).toEqual('timeout'))
            .finally(() => {
                expect(thenSpy).not.toHaveBeenCalled();
                done();
            });

        jasmine.Ajax.requests.mostRecent().responseTimeout();
    });

    it('should return promise in rejected state with empty object if request returns not 200 status code', (done) => {
        const thenSpy = jasmine.createSpy('spy');

        person.updateData()
            .then(thenSpy)
            .catch(msg => {
                expect(msg).toEqual(404);
            })
            .finally(() => {
                expect(thenSpy).not.toHaveBeenCalled();
                done();
            });

        jasmine.Ajax.requests.mostRecent().respondWith({
            status: 404,
            responseText: 'bad response'
        })
    })
});

describe('PersonList method getPersons', () => {
    let config = {
        proto: 'http',
        url: 'yandex.ru'
    };
    let person;

    beforeEach(() => {
        person = new PersonList(config, {});
    });

    it('should return correct list of persons', () => {
        person.personList = [
            { name: 'Person1'},
            { name: 'Person2'},
            { name: 'Person3'},
            { name: 'Person4'},
            { name: 'Person5'},
        ];
        const expected = [
            { name: 'Person2'},
            { name: 'Person3'},
        ];

        expect(person.getPersons(2,4)).toEqual(expected);
    })
});
