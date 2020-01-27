// basic object
export function Ball() {}

Ball.prototype.getDescription = function() { return 'ball' }

// red decorator
export function RedBallDecorator(ball) {
    this.ball = ball
}
Object.setPrototypeOf(RedBallDecorator.prototype, Ball.prototype)
RedBallDecorator.prototype.getDescription = function() { return `red ${this.ball.getDescription()}`}


// lines decorator
export function BallWithLinesDecorator(ball) {
    this.ball = ball
}
Object.setPrototypeOf(BallWithLinesDecorator.prototype, Ball.prototype)
BallWithLinesDecorator.prototype.getDescription = function() { return `${this.ball.getDescription()} with lines` }
