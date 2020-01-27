import {Child} from './chain-task.js';

describe('Test chain task', () => {

    it('should return correct phrases', (done) => {
        let girl3
        const boy1  = new Child(girl3, 'boy1')
        const girl1 = new Child(boy1, 'girl1')
        const boy2  = new Child(girl1, 'boy2')
        const girl2 = new Child(boy2, 'girl2')
        const boy3  = new Child(girl2, 'boy3')
              girl3 = new Child(boy3, 'girl3')

        girl3.eat(10, msg => {
            expect(msg).toBe('Neener-neener! I am glutton! And now are No apples')
            done()
        });
    })
})
