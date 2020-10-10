import throttle from 'lodash/throttle'

import Box from './shapes/box.js'

import Rotate from './animations/rotate.js'
import Scale from './animations/scale.js'
import Translate from './animations/translate.js'

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
      new Translate(this.ctx, {
        content: new Scale(this.ctx, {
          content: new Rotate(this.ctx, {
            content: new Box(this.ctx, { width: 100, height: 100 }),
            origin: [ 50, 50 ],
          }),
          end: [ 2, 2 ],
          duration: 500,
          origin: [ 50, 50 ],
        }),
        start: [ this.canvas.width + 200, 100 ],
        end: [ -200, 100 ],
        duration: 1000,
      }),

      new Translate(this.ctx, {
        content: new Rotate(this.ctx, {
          content: new Box(this.ctx, { width: 200, height: 100 }),
          origin: [ 100, 50 ],
          duration: 500,
        }),
        start: [ this.canvas.width + 400, 50 ],
        end: [ -200, 50 ],
        duration: 2000,
      }),

      new Translate(this.ctx, {
        content: new Rotate(this.ctx, {
          content: new Scale(this.ctx, {
            content: new Box(this.ctx, { width: 300, height: 300 }),
            end: [ 1, 2 ],
            duration: 500,
            origin: [150, 150],
          }),
          origin: [150, 150],
          duration: 5000,
        }),
        start: [ 100, -100 ],
        end: [ this.canvas.width - 100, this.canvas.height + 100 ],
      }),
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
