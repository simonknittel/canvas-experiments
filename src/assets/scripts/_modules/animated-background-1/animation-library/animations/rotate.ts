import AnimationElement from './animation-element'

export default class Rotate extends AnimationElement {
  start: number
  current: number
  end: number

  loop: number
  loopCount: number

  timingFunction: TimingFunctions
  duration: number
  elapsedTime: number

  origin: [number, number]

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    allElements: ElementCollection,
    settings: RotateSettings
  ) {
    super(canvas, ctx, allElements, settings)

    this.start = settings.start || 0
    this.current = this.start
    this.end = settings.end || Math.PI * 2

    this.loop = settings.loop || 0
    this.loopCount = -1

    this.timingFunction = settings.timingFunction
    this.duration = settings.duration || 1000
    this.elapsedTime = 0

    this.origin = settings.origin || [ 0, 0 ]
  }

  update(timeDelta = 0) {
    this.ctx.save()

    this.moveOrigin()
    this.rotate(timeDelta)
    this.resetOrigin()
    this.updateChildren(timeDelta)

    this.ctx.restore()
  }

  moveOrigin() {
    this.ctx.translate(this.origin[0], this.origin[1])
  }

  resetOrigin() {
    this.ctx.translate(-this.origin[0], -this.origin[1])
  }

  rotate(timeDelta: number) {
    if (this.animate) {
      this.elapsedTime += timeDelta

      if (this.loopCount < this.loop) {
        this.getCurrent(
          this.start,
          this.end,
          this.current,
          timeDelta,
          this.duration,
          this.elapsedTime,
          (current, elapsedTime, reset) => {
            this.current = reset ? this.start : current
            this.elapsedTime = reset ? 0 : elapsedTime
          },
          this.timingFunction,
        )
      }
    }

    this.ctx.rotate(this.current)
  }
}
