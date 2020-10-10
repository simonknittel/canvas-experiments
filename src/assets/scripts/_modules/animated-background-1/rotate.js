import Box from './box.js'
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
   * @param {Number[]} settings.rotationOrigin
   * @param {Box|Scale|Translate} settings.content
   */
  constructor(ctx, settings) {
    this.ctx = ctx

    this.start = settings.start || 0
    this.current = this.start
    this.end = settings.end || Math.PI * 2

    this.duration = settings.duration || 1000
    this.rotationOrigin = settings.rotationOrigin || [ 0, 0 ]

    this.content = settings.content

    // TODO: Add possibility to specify a timing function
  }

  update(timeDelta = 0) {
    this.ctx.save()
    this.moveRotationOrigin()
    this.rotate(timeDelta)
    this.resetRotationOrigin()
    this.content.update(timeDelta)
    this.ctx.restore()
  }

  moveRotationOrigin() {
    this.ctx.translate(this.rotationOrigin[0], this.rotationOrigin[1])
  }

  resetRotationOrigin() {
    this.ctx.translate(-this.rotationOrigin[0], -this.rotationOrigin[1])
  }

  rotate(timeDelta) {
    if (this.end) {
      this.current = getCurrent(
        this.start,
        this.end,
        this.current,
        timeDelta,
        this.duration,
      )
    }

    this.ctx.rotate(this.current)
  }
}
