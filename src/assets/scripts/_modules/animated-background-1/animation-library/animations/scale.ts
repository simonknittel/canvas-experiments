import Animation from './animation'

export interface ScaleSettings extends AnimationSettings {
  start?: [number, number]
  end: [number, number]
  timingFunction?: [TimingFunction, TimingFunction]
  duration?: [number, number]
  origin?: [number, number]
}

export default class Scale extends Animation {
  start: [number, number]
  current: [number, number]
  end: [number, number]

  timingFunction: [TimingFunction, TimingFunction] | []
  duration: [number, number]
  elapsedTime: [number, number]

  origin: [number, number]

  constructor(
    ctx: CanvasRenderingContext2D,
    allElements: ElementCollection,
    settings: ScaleSettings
  ) {
    super(ctx, allElements, settings)

    this.start = settings.start || [ 1, 1 ]
    this.current = [ ...this.start ]
    this.end = settings.end || [ 2, 2 ]

    this.timingFunction = settings.timingFunction || []
    this.duration = settings.duration || [ 1000, 1000 ]
    this.elapsedTime = [ 0, 0 ]

    this.origin = settings.origin || [ 0, 0 ]
  }

  update(timeDelta = 0) {
    this.ctx.save()

    this.moveOrigin()
    this.scale(timeDelta)
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

  scale(timeDelta: number) {
    if (this.animate) {
      this.elapsedTime = [
        this.elapsedTime[0] + timeDelta,
        this.elapsedTime[1] + timeDelta,
      ]

      // X
      const rtn0 = this.getCurrent(
        this.start[0],
        this.end[0],
        this.current[0],
        timeDelta,
        this.duration[0],
        this.elapsedTime[0],
        this.timingFunction[0],
      )
      this.current[0] = rtn0.current
      this.elapsedTime[0] = rtn0.elapsedTime

      // Y
      const rtn1 = this.getCurrent(
        this.start[1],
        this.end[1],
        this.current[1],
        timeDelta,
        this.duration[1],
        this.elapsedTime[1],
        this.timingFunction[1],
      )
      this.current[1] = rtn1.current
      this.elapsedTime[1] = rtn1.elapsedTime
    }

    this.ctx.scale(this.current[0], this.current[1])
  }
}
