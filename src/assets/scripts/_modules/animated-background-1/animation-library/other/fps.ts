import Element from "../element"

export default class FPS extends Element {
  skip: boolean
  lastFPS: number
  lowestFPS: number

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    allElements: ElementCollection
  ) {
    super(canvas, ctx, allElements)

    this.skip = false
    setInterval(() => {
      this.skip = false
    }, 500)
  }

  update(timeDelta: number) {
    this.calculateFPS(timeDelta)

    this.ctx.save()

    this.ctx.fillStyle = '#000'
    this.ctx.font = '16px sans-serif'
    this.ctx.fillText(
      this.lastFPS.toString(),
      0,
      0,
    )

    this.ctx.restore()
  }

  calculateFPS(timeDelta: number) {
    const currentFPS = Math.round(1000 / timeDelta)
    if (
      this.lowestFPS === undefined
      || currentFPS < this.lowestFPS
    ) this.lowestFPS = currentFPS

    if (this.skip) return
    this.skip = true

    this.lastFPS = this.lowestFPS
    this.lowestFPS = undefined
  }
}
