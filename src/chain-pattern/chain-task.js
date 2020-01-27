export function Child(next, name) {
    this.next = next
    this.name = name
}

Child.prototype.eat = function(apples, callback) {
    apples = apples - Math.round(Math.random() * 2 + 1)

    if (apples <= 1) {
        callback(`Neener-neener! I am glutton! And now are No apples`)
        return
    }

    this.next.eat(apples, callback)
}
