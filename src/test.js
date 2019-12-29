function calc(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b
    } else {
        throw new TypeError('Arguments should be numbers')
    }
}
