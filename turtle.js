export class Turtle {
    constructor(canvas, x, y, angle = 0, width = 1) {
        this.x = x
        this.y = y
        this.angle = angle
        this.width = width
        this.ctx = canvas.getContext('2d')
        this.degToRad = Math.PI / 180
    }
    updateCoordinates(x, y) {
        this.x = x
        this.y = y
    }
    left(angle) {
        this.angle -= angle
    }
    right(angle) {
        this.angle += angle
    }
    drawLine(length) {
        this.ctx.beginPath()
        this.ctx.lineCap = 'round'
        this.ctx.moveTo(this.x, this.y)
        this.ctx.lineTo(this.x + length * Math.cos(this.angle * this.degToRad), this.y + length * Math.sin(this.angle * this.degToRad))
        this.ctx.stroke()
        this.updateCoordinates(this.x + length * Math.cos(this.angle * this.degToRad), this.y + length * Math.sin(this.angle * this.degToRad))
    }
    lineWidth(width) {
        this.ctx.lineWidth = width
        this.width = width
    }
    lineColor(color) {
        this.ctx.strokeStyle = color
    }
}
