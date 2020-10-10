import throttle from 'lodash/throttle'

import Box from './shapes/box.js'
import Text from './shapes/text.js'

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
            animate: true,
            origin: [ 50, 50 ],
          }),
          animate: true,
          end: [ 2, 2 ],
          duration: [ 500, 500 ],
          origin: [ 50, 50 ],
          timingFunction: [ 'cos', 'cos' ],
        }),
        animate: true,
        start: [ this.canvas.width + 200, 400 ],
        end: [ -200, 400 ],
        duration: [ 1000, 1000 ],
        timingFunction: [ 'cos', 'cos' ],
      }),

      new Translate(this.ctx, {
        content: new Rotate(this.ctx, {
          content: new Box(this.ctx, { width: 200, height: 100 }),
          animate: true,
          origin: [ 100, 50 ],
          duration: 500,
        }),
        animate: true,
        start: [ this.canvas.width + 400, 300 ],
        end: [ -200, 300 ],
        duration: [ 2000, 2000 ],
      }),

      new Translate(this.ctx, {
        content: new Rotate(this.ctx, {
          content: new Scale(this.ctx, {
            content: new Box(this.ctx, { width: 300, height: 300 }),
            animate: true,
            end: [ 1, 2 ],
            duration: [ 500, 500 ],
            origin: [ 150, 150 ],
            timingFunction: [ 'cos', 'cos' ],
          }),
          animate: true,
          origin: [ 150, 150 ],
          duration: 5000,
        }),
        animate: true,
        start: [ 0, -400 ],
        end: [ this.canvas.width, this.canvas.height + 400 ],
        duration: [ 5000, 5000 ],
      }),

      new Translate(this.ctx, {
        content: new Rotate(this.ctx, {
          content: new Box(this.ctx, { width: 200, height: 100 }),
          origin: [ 100, 50 ],
          start: Math.PI / 4,
        }),
        start: [ this.canvas.width - 300, 100 ],
      }),

      new Translate(this.ctx, {
        content: new Rotate(this.ctx, {
          content: new Text(this.ctx, { font: '50px sans-serif', text: 'Wheeeeeeeeeee' }),
          animate: true,
          origin: [ 100, 50 ],
          duration: 750,
        }),
        animate: true,
        start: [ 100, this.canvas.height ],
        end: [ this.canvas.width, -200 ],
        duration: [ 3000, 3000 ],
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
