export default class Img {
  ctx

  url: string
  width: number
  height: number

  image: HTMLImageElement
  transparency: number

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    allElements: ElementCollection,
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
