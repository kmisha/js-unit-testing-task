function Observable() {
    this.listeners = []
}

Observable.prototype.on = function (callback) {
    this.listeners.push(callback)
}

Observable.prototype.emit = function (data) {
    this.listeners.forEach(listener => listener(data))
}

export function Wallet(name) {
    this.walletName = name
    this.amount = Math.random() * 1000
    Observable.call(this)
}

Wallet.prototype = Object.create(Observable.prototype)
Wallet.prototype.constructor = Wallet

Wallet.prototype.send = function (callback) {
    const minus = Math.random() * 100
    this.amount = this.amount - minus

    this.emit(minus)

    if (this.amount > 0) {
        setTimeout(() => this.send(callback), Math.random() * 500)
    } else {
        callback(`WALLET ${this.walletName} is empty`)
    }
}

Wallet.prototype.eventFromWallet = function (plus) {
    this.amount += plus
}
