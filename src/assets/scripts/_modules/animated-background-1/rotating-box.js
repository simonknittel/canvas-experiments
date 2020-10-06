export default class RotatingBox {
  constructor(ctx, settings) {
    this.ctx = ctx

    this.originalX = settings.x || 0,
    this.originalY = settings.y || 0,
    this.x = this.originalX,
    this.y = this.originalY,
    this.moveToX = settings.moveToX
    this.moveToY = settings.moveToY
    this.width = settings.width || 100
    this.height = settings.height || 100
    this.msPerRotation = settings.msPerRotation || 0.001,
    this.fillStyle = settings.fillStyle || '#f00'

    this.rotation = 0

    this.xOffset = this.width / 2
    this.yOffset = this.height / 2
  }

  update(timeDelta = 0) {
    this.ctx.save()

    this.translate(timeDelta)
    this.rotate(timeDelta)

    this.ctx.fillStyle = this.fillStyle
    this.ctx.fillRect(
      -this.xOffset,
      -this.yOffset,
      this.width,
      this.height,
    )

    this.ctx.restore()
  }

  translate(timeDelta) {
    if (this.moveToX) {
      if (this.moveToX > this.originalX) {
        this.x += timeDelta / 2
        if (this.x >= this.moveToX) this.x = this.originalX
      } else {
        this.x -= timeDelta / 2
        if (this.x <= this.moveToX) this.x = this.originalX
      }
    }

    if (this.moveToY) {
      this.y += timeDelta / 2
      if (this.y >= this.moveToY) this.y = this.originalY
    }

    this.ctx.translate(
      this.x + this.xOffset,
      this.y + this.yOffset,
    )
  }

  rotate(timeDelta) {
    this.rotation += timeDelta * this.msPerRotation
    this.ctx.rotate(this.rotation)
  }
}
