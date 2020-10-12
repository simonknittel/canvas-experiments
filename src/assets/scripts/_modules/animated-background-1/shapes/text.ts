interface Settings {
  font: string
  text: string
}

export default class Text {
  ctx: CanvasRenderingContext2D
  allElements: object
  settings: Settings

  font: string
  text: string

  constructor(
    ctx: CanvasRenderingContext2D,
    allElements: object,
    settings: Settings
  ) {
    this.ctx = ctx

    this.font = settings.font
    this.text = settings.text
  }

  update() {
    this.ctx.save() // TODO: Do I need this?

    this.ctx.fillStyle = '#000'
    this.ctx.font = this.font
    this.ctx.fillText(
      this.text,
      0,
      0,
    )

    this.ctx.restore() // TODO: Do I need this?
  }
}
