import Box from './box.js'
import Rotating from './rotating.js'

export default class Translate {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} settings
   * @param {Box|Rotating} settings.content
   */
  constructor(ctx, settings) {
    this.ctx = ctx

    this.originalX = settings.x || 0
    this.originalY = settings.y || 0

    this.x = this.originalX
    this.y = this.originalY

    this.moveToX = settings.moveToX
    this.moveToY = settings.moveToY

    this.moveInMs = settings.moveInMs || 5000

    this.content = settings.content

    // TODO: Add possibility to specify a timing function
  }

  update(timeDelta = 0) {
    this.ctx.save()
    this.translate(timeDelta)
    this.content.update(timeDelta)
    this.ctx.restore()
  }

  translate(timeDelta) {
    if (this.moveToX) {
      if (this.moveToX > this.originalX) {
        const xDistance = this.moveToX - this.originalX
        const xSpeed = xDistance / this.moveInMs * timeDelta
        this.x += xSpeed

        if (this.x > this.moveToX) {
          this.x = this.originalX
          this.y = this.originalY
        }
      } else if (this.moveToX < this.originalX) {
        const xDistance = this.originalX - this.moveToX
        const xSpeed = xDistance / this.moveInMs * timeDelta
        this.x -= xSpeed

        if (this.x < this.moveToX) {
          this.x = this.originalX
          this.y = this.originalY
        }
      }

      if (this.moveToY > this.originalY) {
        const yDistance = this.moveToY - this.originalY
        const ySpeed = yDistance / this.moveInMs * timeDelta
        this.y += ySpeed
      } else if (this.moveToY < this.originalY) {
        const yDistance = this.originalY - this.moveToY
        const ySpeed = yDistance / this.moveInMs * timeDelta
        this.y -= ySpeed
      }
    }

    this.ctx.translate(this.x, this.y)
  }
}
