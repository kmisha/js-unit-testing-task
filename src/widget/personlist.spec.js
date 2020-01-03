import PersonList from './personlist';

describe('PersonList', () => {
    let config = {};

    beforeEach(() => {
        config = {
            proto: 'http',
            url: 'yandex.ru'
        }
    });

    it('should create a object', () => {

        const person = new PersonList(config,{});
        expect(person).not.toBeUndefined();
        expect(person).not.toBeNull();
    });

    it('should have a personList property', () => {
        const personList = new PersonList(config, {});
        expect(personList.personList).toBeDefined();
        expect(personList.personList).toEqual([]);
    });
});
