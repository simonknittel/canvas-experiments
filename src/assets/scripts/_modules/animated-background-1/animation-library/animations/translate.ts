import AnimationElement from './animation-element'

export interface TranslateSettings extends AnimationSettings {
  start?: [number, number]
  end?: [number, number]
  timingFunction?: [TimingFunction, TimingFunction]
  duration?: [number, number]
  origin?: [number, number]
  local?: boolean
}

export default class Translate extends AnimationElement {
  start: [number, number]
  current: [number, number]
  end: [number, number]

  timingFunction: [TimingFunction, TimingFunction] | []
  duration: [number, number]
  elapsedTime: [number, number]

  local: boolean

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    allElements: ElementCollection,
    settings: TranslateSettings
  ) {
    super(canvas, ctx, allElements, settings)

    this.start = settings.start || [ 0, 0 ]
    this.current = [ ...this.start ]
    this.end = settings.end

    this.timingFunction = settings.timingFunction || []
    this.duration = settings.duration || [ 1000, 1000 ]
    this.elapsedTime = [ 0, 0 ]

    this.local = settings.local || false
  }

  update(timeDelta = 0) {
    if (!this.local) this.ctx.save()

    this.translate(timeDelta)
    this.updateChildren(timeDelta)

    if (!this.local) this.ctx.restore()
  }

  translate(timeDelta: number) {
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

    this.ctx.translate(this.current[0], this.current[1])
  }
}
