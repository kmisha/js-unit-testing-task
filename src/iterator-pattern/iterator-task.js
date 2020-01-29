import {ObservableArray} from './observable-array.js';

export class ArrayIterator{
    constructor(array, config) {
        if (array instanceof ObservableArray) {
            this.array = array
            array.on(value => this.array = value)
        } else {
            this.array = array || []
        }
        this.circular = config.cyclic || false
        this.step = 1
        this.width = config.width || 1
        this.start = 0
        this.nextHandler = config.windowTransform
    }

    * getIndexes_(start, width, circular) {
        for (let idx = 0; idx < width; idx++) {
            yield circular ? (start + idx) % this.array.length : start + idx
        }
    }

    current() {
        const result = []
        const start = this.start < 0 ? this.array.length + this.start : this.start
        for(let idx of this.getIndexes_(start, this.width, this.circular)) {
            this.array[idx] !== undefined && result.push(this.array[idx])
        }

        return result
    }

    backward() {
        this.start = this.nextHandler ? this.nextHandler(this.start) : this.start - this.step
        return this.current()
    }

    forward() {
        this.start = this.nextHandler? this.nextHandler(this.start) : this.start + this.step
        return this.current()
    }

    jumpTo(number) {
        const result = this.step * number
        this.start = result >=  this.array.length ? result % this.array.length : result
    }
}
