import PersonList from './personlist';

describe('PersonList', () => {
    it('should create a object', () => {
        const person = new PersonList({},{});
        expect(person).not.toBeUndefined();
        expect(person).not.toBeNull();
    });

    it('should have a personList property', () => {
        const personList = new PersonList({}, {});
        expect(personList.personList).toBeDefined();
        expect(personList.personList).toEqual([]);
    });
});
