interface Settings {
  url: string
  width: number
  height: number
}

export default class Img {
  ctx: CanvasRenderingContext2D
  allElements: object
  settings: Settings

  url: string
  width: number
  height: number

  image: HTMLImageElement

  constructor(
    ctx: CanvasRenderingContext2D,
    allElements: object,
    settings: Settings
  ) {
    this.ctx = ctx

    this.url = settings.url
    this.width = settings.width
    this.height = settings.height

    this.image = new Image()
    this.image.src = this.url
  }

  update() {
    this.ctx.save() // TODO: Do I need this?

    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
    )

    this.ctx.restore() // TODO: Do I need this?
  }
}
