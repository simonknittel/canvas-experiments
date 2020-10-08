import throttle from 'lodash/throttle'

import RotatingBox from './rotating-box.js'

/* eslint-disable require-jsdoc, object-property-newline */

class AnimatedBackground1 {
  constructor(container) {
    this.container = container
    this.canvas = this.container.querySelector('canvas')
    if (!this.canvas) return

    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.canvas.getContext('2d')

    this.retrieveSettings()
    this.resizeCanvas()

    const throttledOnResize = throttle(this.onResize.bind(this), 500)
    window.addEventListener('resize', throttledOnResize)
  }

  retrieveSettings() {
    const preset1 = {
      animation: {
        play: true,
        msPerRotation: 1000,
      },
      background: {
        top: '#0028ad',
        bottom: '#ffc875',
      },
    }

    this.settings = preset1
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    this.draw()
  }

  onResize() {
    this.resizeCanvas()
  }

  draw() {
    this.prevTime = new Date().getTime()

    this.elements = [
      new RotatingBox(this.ctx, { x: this.canvas.width + 200, y: 100, moveToX: -200, moveToY: 100, msPerRotation: 0.0005 }),
      new RotatingBox(this.ctx, { x: this.canvas.width + 400, y: 50, moveToX: -200, moveToY: 50, msPerRotation: 0.01 }),
      new RotatingBox(this.ctx, { x: 100, y: -100, moveToX: this.canvas.width - 100, moveToY: this.canvas.height + 100, msPerRotation: 0.01 }),
    ]

    if (this.animationFrame) window.cancelAnimationFrame(this.animationFrame)
    this.animationFrame = window.requestAnimationFrame(this.drawLoop.bind(this))
  }

  drawLoop() {
    const now = new Date().getTime()
    const timeDelta = now - this.prevTime

    this.drawBackground()

    this.elements.forEach(element => element.update(timeDelta))

    this.prevTime = now

    if (!this.settings.animation.play) return
    this.animationFrame = window.requestAnimationFrame(this.drawLoop.bind(this))
  }

  drawBackground() {
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height)
    gradient.addColorStop(0, this.settings.background.top)
    gradient.addColorStop(1, this.settings.background.bottom)

    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

new AnimatedBackground1(document)
