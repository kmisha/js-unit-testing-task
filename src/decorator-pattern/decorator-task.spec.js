
import {Ball, RedBallDecorator, BallWithLinesDecorator} from './decorator-task.js'

describe('when you', () => {
    let ball;

    beforeEach(() => {
        ball = new Ball()
    })

    it('create simple ball it should be a ball', () => {
        expect(ball.getDescription()).toBe('ball')
        expect(ball instanceof Ball).toBe(true)
    })

    it('create red ball it should the red ball', () => {
        expect(new RedBallDecorator(ball).getDescription()).toBe('red ball')
        expect(new RedBallDecorator(ball) instanceof Ball).toBe(true)
    })

    it('create ball with lines it should the ball with lines', () => {
        expect(new BallWithLinesDecorator(ball).getDescription()).toBe('ball with lines')
        expect(new BallWithLinesDecorator(ball) instanceof Ball).toBe(true)
    })

    it('create red ball with lines it should the red ball with lines', () => {
        expect(new BallWithLinesDecorator(new RedBallDecorator(ball)).getDescription()).toBe('red ball with lines')
        expect(new BallWithLinesDecorator(new RedBallDecorator(ball)) instanceof Ball).toBe(true)
    })
})
