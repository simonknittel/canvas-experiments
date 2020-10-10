import Box from './box.js'
import Scale from './scale.js'
import Translate from './translate.js'

export default class Rotate {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} settings
   * @param {Number[]} settings.rotationOrigin
   * @param {Box|Scale|Translate} settings.content
   */
  constructor(ctx, settings) {
    this.ctx = ctx

    this.rotationOrigin = settings.rotationOrigin || [ 0, 0 ]
    this.duration = settings.duration || 0.001

    this.current = 0

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
    this.current += timeDelta * this.duration // TODO: Properly calculate msPerRotation
    this.ctx.rotate(this.current)
  }
}
