export interface ImgSettings extends ShapeSettings {
  url: string
  width: number
  height: number
  transparency?: number
}

export default class Img {
  ctx: CanvasRenderingContext2D
  allElements: object

  url: string
  width: number
  height: number

  image: HTMLImageElement
  transparency: number

  constructor(
    ctx: CanvasRenderingContext2D,
    allElements: object,
    settings: ImgSettings
  ) {
    this.ctx = ctx

    this.url = settings.url
    this.width = settings.width
    this.height = settings.height

    this.image = new Image()
    this.image.src = this.url

    this.transparency = settings.transparency || 1
  }

  update() {
    this.ctx.save()

    this.ctx.globalAlpha = this.transparency

    this.ctx.drawImage(
  this.image,
  0,
  0,
  this.width,
  this.height,
    )

    this.ctx.globalAlpha = 1

    this.ctx.restore()
  }
}
