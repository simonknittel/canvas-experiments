export default class Box {
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx, settings) {
    this.ctx = ctx

    this.width = settings.width || 100
    this.height = settings.height || 100
    this.fillStyle = settings.fillStyle || '#000'
  }

  update() {
    this.ctx.save() // TODO: Do I need this?

    this.ctx.fillStyle = this.fillStyle
    this.ctx.fillRect(
      0,
      0,
      this.width,
      this.height,
    )

    this.ctx.restore() // TODO: Do I need this?
  }
}
