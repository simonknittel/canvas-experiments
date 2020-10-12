interface Settings {
  width?: number
  height?: number
  fillStyle?: string
}

export default class Box {
  ctx: CanvasRenderingContext2D
  allElements: object
  settings: Settings

  width: number
  height: number
  fillStyle: string

  constructor(
    ctx: CanvasRenderingContext2D,
    allElements: object,
    settings: Settings
  ) {
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
