import AnimationElement from './animation-element'

export interface RotateSettings extends AnimationSettings {
  start?: number
  end?: number
  timingFunction: TimingFunction
  duration?: number
  origin?: [number, number]
}

export default class Rotate extends AnimationElement {
  start: number
  current: number
  end: number

  timingFunction: TimingFunction
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

      const rtn = this.getCurrent(
        this.start,
        this.end,
        this.current,
        timeDelta,
        this.duration,
        this.elapsedTime,
        this.timingFunction,
      )
      this.current = rtn.current
      this.elapsedTime = rtn.elapsedTime
    }

    this.ctx.rotate(this.current)
  }
}
