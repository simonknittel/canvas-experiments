import throttle from 'lodash/throttle'

/* eslint-disable require-jsdoc, object-property-newline */

class Test1 {
  constructor(container) {
    this.container = container
    this.canvas = this.container.querySelector('canvas')

    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.canvas.getContext('2d')

    this.resizeCanvas()

    const throttledOnResize = throttle(this.onResize.bind(this), 500)
    window.addEventListener('resize', throttledOnResize)
  }

  onResize() {
    this.resizeCanvas()
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    this.draw()
  }

  draw() {
    const start = { x: 0, y: 0 }
    this.drawDot(start)

    const end = { x: 0, y: this.canvas.height }
    this.drawDot(end)

    const control = { x: this.canvas.width, y: this.canvas.height / 2 }
    this.drawDot(control, [start, end])

    this.ctx.beginPath()
    this.ctx.moveTo(start.x, start.y)
    this.ctx.quadraticCurveTo(control.x, control.y, end.x, end.y)
    this.ctx.strokeStyle = 'black'
    this.ctx.setLineDash([])
    this.ctx.stroke()
  }

  drawDot(dot, otherDots = []) {
    this.ctx.beginPath()
    this.ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2)
    this.ctx.fillStyle = 'red'
    this.ctx.fill()

    otherDots.forEach(otherDot => {
      this.ctx.beginPath()
      this.ctx.moveTo(otherDot.x, otherDot.y)
      this.ctx.lineTo(dot.x, dot.y)
      this.ctx.strokeStyle = 'lightgrey'
      this.ctx.setLineDash([3, 10])
      this.ctx.stroke()
    })
  }
}

new Test1(document)
