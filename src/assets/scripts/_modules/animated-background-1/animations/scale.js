import Box from '../shapes/box.js'

import Rotate from './rotate.js'
import Translate from './translate.js'

import getCurrent from './utils/get-current.js'

export default class Scale {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} settings
   * @param {Number[]} settings.start
   * @param {Number[]} settings.end
   * @param {Number[]} settings.duration
   * @param {Number[]} settings.origin
   * @param {Box|Rotate|Translate} settings.child
   */
  constructor(ctx, allElements, settings) {
    this.ctx = ctx
    this.allElements = allElements

    this.animate = settings.animate || false

    this.start = settings.start || [ 1, 1 ]
    this.current = [ ...this.start ]
    this.end = settings.end || [ 2, 2 ]

    this.timingFunction = settings.timingFunction || []
    this.duration = settings.duration || [ 1000, 1000 ]
    this.elapsedTime = [ 0, 0 ]

    this.origin = settings.origin || [ 0, 0 ]

    this.childKey = settings.child

    // TODO: Add possibility to specify a timing function
  }

  update(timeDelta = 0) {
    this.ctx.save()

    this.moveOrigin()
    this.scale(timeDelta)
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

  scale(timeDelta) {
    if (this.animate) {
      this.elapsedTime = [
        this.elapsedTime[0] + timeDelta,
        this.elapsedTime[1] + timeDelta,
      ]

      // X
      const rtn0 = getCurrent(
        this.start[0],
        this.end[0],
        this.current[0],
        timeDelta,
        this.duration[0],
        this.elapsedTime[0],
        this.timingFunction[0],
      )
      // console.log(rtn0)
      this.current[0] = rtn0.current
      this.elapsedTime[0] = rtn0.elapsedTime

      // Y
      const rtn1 = getCurrent(
        this.start[1],
        this.end[1],
        this.current[1],
        timeDelta,
        this.duration[1],
        this.elapsedTime[1],
        this.timingFunction[1],
      )
      // console.log(rtn1)
      this.current[1] = rtn1.current
      this.elapsedTime[1] = rtn1.elapsedTime
    }

    this.ctx.scale(this.current[0], this.current[1])
  }

  updateChild(timeDelta) {
    if (!this.child) this.child = this.allElements[this.childKey]

    if (!this.child.initializedInstance) return
    this.child.initializedInstance.update(timeDelta)
  }
}
