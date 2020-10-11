import Box from '../shapes/box.js'

import Scale from './scale.js'
import Translate from './translate.js'

import getCurrent from './utils/get-current.js'

export default class Rotate {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} settings
   * @param {Number[]} settings.start
   * @param {Number[]} settings.end
   * @param {Number} settings.duration
   * @param {Number[]} settings.origin
   * @param {Box|Scale|Translate} settings.child
   */
  constructor(ctx, allElements, settings) {
    this.ctx = ctx
    this.allElements = allElements

    this.animate = settings.animate || false

    this.start = settings.start || 0
    this.current = this.start
    this.end = settings.end || Math.PI * 2

    this.timingFunction = settings.timingFunction
    this.duration = settings.duration || 1000
    this.elapsedTime = 0

    this.origin = settings.origin || [ 0, 0 ]

    this.childKey = settings.child

    // TODO: Add possibility to specify a timing function
  }

  update(timeDelta = 0) {
    this.ctx.save()

    this.moveOrigin()
    this.rotate(timeDelta)
    this.resetOrigin()
    this.updateChild(timeDelta)

    this.ctx.restore()
  }

  moveOrigin() {
    this.ctx.translate(this.origin[0], this.origin[1])
  }

  resetOrigin() {
    this.ctx.translate(-this.origin[0], -this.origin[1])
  }

  rotate(timeDelta) {
    if (this.animate) {
      this.elapsedTime += timeDelta

      const rtn = getCurrent(
        this.start,
        this.end,
        this.current,
        timeDelta,
        this.duration,
        this.elapsedTime,
        this.timingFunction,
      )
      this.current = rtn.current
      this.elapsedTime = rtn.elapsedTime
    }

    this.ctx.rotate(this.current)
  }

  updateChild(timeDelta) {
    if (!this.child) this.child = this.allElements[this.childKey]

    if (!this.child.initializedInstance) return
    this.child.initializedInstance.update(timeDelta)
  }
}
