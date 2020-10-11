import throttle from 'lodash/throttle'

import ElementsInitializer from './elements-initializer.js'

/* eslint-disable require-jsdoc, object-property-newline */

class AnimatedBackground1 {
  constructor(container) {
    this.container = container
    this.canvas = this.container.querySelector('canvas')
    if (!this.canvas) return

    /** @type {CanvasRenderingContext2D} */
    this.ctx = this.canvas.getContext('2d')

    this.getPreset('flowers')
    this.resizeCanvas()

    const throttledOnResize = throttle(this.onResize.bind(this), 500)
    window.addEventListener('resize', throttledOnResize)
  }

  getPreset(name) {
    const Preset = require(`./presets/${name}.js`).default
    const initializedPreset = new Preset(this)
    this.config = initializedPreset.getConfig()
  }

  appendElement(key, config) {
    if (!this.elementsInitializer) return
    this.elementsInitializer.appendElement(key, config)
    this.rootElements = this.elementsInitializer.getRootElements()
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

    this.elementsInitializer = new ElementsInitializer(this.config.elements, this.ctx, this.canvas)
    this.rootElements = this.elementsInitializer.getRootElements()

    if (this.animationFrame) window.cancelAnimationFrame(this.animationFrame)
    this.animationFrame = window.requestAnimationFrame(this.drawLoop.bind(this))
  }

  drawLoop() {
    const now = new Date().getTime()
    const timeDelta = now - this.prevTime

    this.drawBackground()

    for (const key in this.rootElements) {
      if (!this.rootElements.hasOwnProperty(key)) continue
      this.rootElements[key].initializedInstance.update(timeDelta)
    }

    this.prevTime = now

    if (!this.config.animation.play) return
    this.animationFrame = window.requestAnimationFrame(this.drawLoop.bind(this))
  }

  drawBackground() {
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height)
    gradient.addColorStop(0, this.config.background.top)
    gradient.addColorStop(1, this.config.background.bottom)

    this.ctx.fillStyle = gradient
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

new AnimatedBackground1(document)
