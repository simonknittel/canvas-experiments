import Box from './box.js'
import Translate from './translate.js'

export default class Rotating {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} settings
   * @param {Number[]} settings.rotationOrigin
   * @param {Box|Translate} settings.content
   */
  constructor(ctx, settings) {
    this.ctx = ctx

    this.rotationOrigin = settings.rotationOrigin || [0, 0]
    this.msPerRotation = settings.msPerRotation || 0.001

    this.rotation = 0

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
    this.rotation += timeDelta * this.msPerRotation
    this.ctx.rotate(this.rotation)
  }
}
