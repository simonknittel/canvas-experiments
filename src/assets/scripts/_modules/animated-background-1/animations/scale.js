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
   * @param {Number} settings.duration
   * @param {Number[]} settings.origin
   * @param {Box|Rotate|Translate} settings.content
   */
  constructor(ctx, settings) {
    this.ctx = ctx

    this.start = settings.start || [ 1, 1 ]
    this.current = [ ...this.start ]
    this.end = settings.end || [ 2, 2 ]

    this.duration = settings.duration || 1000
    this.origin = settings.origin || [ 0, 0 ]

    this.content = settings.content

    // TODO: Add possibility to specify a timing function
  }

  update(timeDelta = 0) {
    this.ctx.save()
    this.moveOrigin()
    this.scale(timeDelta)
    this.resetOrigin()
    this.content.update(timeDelta)
    this.ctx.restore()
  }

  moveOrigin() {
    this.ctx.translate(this.origin[0], this.origin[1])
  }

  resetOrigin() {
    this.ctx.translate(-this.origin[0], -this.origin[1])
  }

  scale(timeDelta) {
    if (this.end) {
      // X
      this.current[0] = getCurrent(
        this.start[0],
        this.end[0],
        this.current[0],
        timeDelta,
        this.duration,
      )

      // Y
      this.current[1] = getCurrent(
        this.start[1],
        this.end[1],
        this.current[1],
        timeDelta,
        this.duration,
      )
    }

    this.ctx.scale(this.current[0], this.current[1])
  }
}
