import {ArrayIterator} from './iterator-task.js';
import {ObservableArray} from "./observable-array";

describe('ArrayIterator', () => {
    let config, iterator

    it('should create correct object after creations', () => {
        iterator = new ArrayIterator([], {})
        expect(iterator).toBeDefined()
    })

    it('should return empty array if initial array was empty', () => {
        iterator = new ArrayIterator([], {})
        expect(iterator.current()).toEqual([])
        expect(iterator.forward()).toEqual([])
        expect(iterator.backward()).toEqual([])
    })

    it('should correct implement the current method', () => {
        config = { cyclic: false, width: 3}
        iterator = new ArrayIterator([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], config)
        expect(iterator.current()).toEqual([0, 1, 2])
    })

    it('should currect implement forward and backward methods', () => {
        config = { cyclic: false, width: 3}
        iterator = new ArrayIterator([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], config)
        expect(iterator.current()).toEqual([0, 1, 2])
        expect(iterator.forward()).toEqual([1, 2, 3])
        expect(iterator.backward()).toEqual([0, 1, 2])
    })

    it('should correct implement the jumpTo method', () => {
        config = { cyclic: false, width: 3}
        iterator = new ArrayIterator([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], config)

        expect(iterator.current()).toEqual([0, 1, 2])
        expect(iterator.jumpTo(5)).toBeUndefined()
        expect(iterator.current()).toEqual([5, 6, 7])
        expect(iterator.backward()).toEqual([4, 5, 6])
        expect(iterator.jumpTo(8)).toBeUndefined()
        expect(iterator.current()).toEqual([8, 9])
        expect(iterator.backward()).toEqual([7, 8, 9])
        iterator.jumpTo(10)
        expect(iterator.current()).toEqual([0, 1, 2])
    })

    it('should correct implement the cycling functionality', () => {
        config = { cyclic: true, width: 3}
        iterator = new ArrayIterator([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], config)

        expect(iterator.current()).toEqual([0, 1, 2])
        expect(iterator.jumpTo(8)).toBeUndefined()
        expect(iterator.current()).toEqual([8, 9, 0])
        expect(iterator.backward()).toEqual([7, 8, 9])
        expect(iterator.forward()).toEqual([8, 9, 0])
        expect(iterator.forward()).toEqual([9, 0, 1])
        expect(iterator.forward()).toEqual([0, 1, 2])
        expect(iterator.jumpTo(0)).toBeUndefined()
        expect(iterator.current()).toEqual([0, 1, 2])
        expect(iterator.backward()).toEqual([9, 0, 1])
        expect(iterator.backward()).toEqual([8, 9, 0])
    })

    it('should correct implement the widow transformation/positioning functionality', () => {
        const transform = windowStart => windowStart - 1
        config = { cyclic: true, width: 3, windowTransform: transform }
        iterator = new ArrayIterator([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], config)

        expect(iterator.current()).toEqual([0, 1, 2])
        expect(iterator.forward()).toEqual([9, 0, 1])
        console.log(iterator.start)
        // expect(iterator.backward()).toEqual([0, 1, 2])
    })


})

describe('ObservableArray', () => {
    let array

    it('should create correct object', () => {
        array = new ObservableArray()
        expect(array).toBeDefined()
        array = new ObservableArray(6)
        expect(array.length).toBe(6)
        array = new ObservableArray(6, 5, 4, 3)
        expect(array.length).toEqual([6, 5, 4, 3])
        expect(typeof array.on).toBe('function')
        expect(typeof array.emit_).toBe('function')
    })

    it('should be observable', (done) => {
        const spy = value => {
            expect(value).toBe(1, 2, 3, 4)
            done()
        }

        array = new ObservableArray(1, 2, 3)
        array.on(spy)

        array.push(4)
    })
})

describe('If array for ArrayIterator if observable', () => {
    let array, iterator, config

    beforeEach(() => {
        config = { cyclic: true, width: 3}
        array = new ObservableArray(1, 2, 3, 4)
        iterator = new ArrayIterator(array, config)
    })

    it('should react to array modification', () => {
        expect(iterator.jumpTo(3)).toBeUndefined()
        expect(iterator.current()).toEqual([3, 4, 1])
        array.push(1, 2, 3, 4, 5)
        expect(iterator.current()).toEqual([3, 4, 5])
    })
})
