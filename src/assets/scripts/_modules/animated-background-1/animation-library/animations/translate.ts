import getCurrent from './utils/get-current'

export interface TranslateSettings extends AnimationSettings {
  start?: [number, number]
  end?: [number, number]
  timingFunction?: [TimingFunction, TimingFunction]
  duration?: [number, number]
  origin?: [number, number]
  local?: boolean
  debug?: {
    showOrigin?: string
  }
}

export default class Translate {
  ctx: CanvasRenderingContext2D
  allElements: object

  animate: boolean

  start: [number, number]
  current: [number, number]
  end: [number, number]

  timingFunction: [TimingFunction, TimingFunction] | []
  duration: [number, number]
  elapsedTime: [number, number]

  local: boolean

  childKey: string
  child: Settings

  debug?: {
    showOrigin?: string
  }

  constructor(
    ctx: CanvasRenderingContext2D,
    allElements: object,
    settings: TranslateSettings
  ) {
    this.ctx = ctx
    this.allElements = allElements

    this.animate = settings.animate || false

    this.start = settings.start || [ 0, 0 ]
    this.current = [ ...this.start ]
    this.end = settings.end

    this.timingFunction = settings.timingFunction || []
    this.duration = settings.duration || [ 1000, 1000 ]
    this.elapsedTime = [ 0, 0 ]

    this.local = settings.local || false

    this.childKey = settings.child

    this.debug = settings.debug
  }

  update(timeDelta = 0) {
    if (!this.local) this.ctx.save()

    if (this.debug && this.debug.showOrigin) {
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, 5, 5, 0, 0, Math.PI * 2)
      this.ctx.fillStyle = this.debug.showOrigin
      this.ctx.fill()
    }

    this.translate(timeDelta)
    this.updateChild(timeDelta)

    if (!this.local) this.ctx.restore()
  }

  translate(timeDelta: number) {
    if (this.animate) {
      this.elapsedTime = [
        this.elapsedTime[0] + timeDelta,
        this.elapsedTime[1] + timeDelta,
      ]

      // X
      const rtn0 = getCurrent(
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
      const rtn1 = getCurrent(
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

  updateChild(timeDelta: number) {
    if (!this.child) this.child = this.allElements[this.childKey]

    if (!this.child.initializedInstance) return
    this.child.initializedInstance.update(timeDelta)
  }
}
