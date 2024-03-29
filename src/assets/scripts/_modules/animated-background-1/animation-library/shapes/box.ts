export default class Box {
  ctx

  width: number
  height: number
  fillStyle: string
  transparency: number

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    allElements: ElementCollection,
    settings: BoxSettings
  ) {
    this.ctx = ctx

    this.width = settings.width || 100
    this.height = settings.height || 100
    this.height = settings.height || 100
    this.fillStyle = settings.fillStyle || '#000'

    this.transparency = settings.transparency || 1
  }

  update() {
    this.ctx.save() // TODO: Do I need this?

    this.ctx.globalAlpha = this.transparency

    this.ctx.fillStyle = this.fillStyle
    this.ctx.fillRect(
      0,
      0,
      this.width,
      this.height,
    )

    this.ctx.globalAlpha = 1

    this.ctx.restore() // TODO: Do I need this?
  }
}
