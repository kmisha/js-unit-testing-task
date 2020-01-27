import {Wallet} from './observer-task.js'

describe('Test observer task', () => {
    let logger = jasmine.createSpyObj('logger', ['log'])
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100 * 1000

    it('should return correct string after start', (done) => {
        const wallet1 = new Wallet('wallet 1')
        const wallet2 = new Wallet('wallet 2')

        wallet1.on(plus => wallet2.eventFromWallet(plus))
        wallet2.on(plus => wallet1.eventFromWallet(plus))

        wallet1.send((msg => {
            expect(msg).toBe('WALLET wallet 1 is empty')
            done()
        }))
        wallet2.send((msg => {
            expect(msg).toBe('WALLET wallet 2 is empty')
            done()
        }))
    })
})
