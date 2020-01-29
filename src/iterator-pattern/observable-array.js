export class ObservableArray extends Array {
    constructor(...args) {
        super(...args)
        this.listeners = []
    }

    on(callback) {
        this.listeners.push(callback)
    }

    pop(...args) {
        super.pop(...args)
        console.log(this)
        this.emit_()
    }

    push(...args) {
        super.push(...args)
        console.log(this)
        this.emit_()
    }

    emit_() {
        this.listeners.forEach(listener => listener(this))
    }
}
