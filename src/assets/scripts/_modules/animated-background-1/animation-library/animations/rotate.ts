import getCurrent from './utils/get-current'

export interface RotateSettings extends AnimationSettings {
  start?: number
  end?: number
  timingFunction: TimingFunction
  duration?: number
  origin?: [number, number]
}

export default class Rotate {
  ctx: CanvasRenderingContext2D
  allElements: ElementCollection

  animate: boolean

  start: number
  current: number
  end: number

  timingFunction: TimingFunction
  duration: number
  elapsedTime: number

  origin: [number, number]

  childKey: string
  child: Settings

  constructor(
    ctx: CanvasRenderingContext2D,
    allElements: ElementCollection,
    settings: RotateSettings
  ) {
    this.ctx = ctx
    this.allElements = allElements

    this.animate = settings.animate || false

    this.start = settings.start || 0
    this.current = this.start
    this.end = settings.end || Math.PI * 2

    this.timingFunction = settings.timingFunction
    this.duration = settings.duration || 1000
    this.elapsedTime = 0

    this.origin = settings.origin || [ 0, 0 ]

    this.childKey = settings.child
  }

  update(timeDelta = 0) {
    this.ctx.save()

    this.moveOrigin()
    this.rotate(timeDelta)
    this.resetOrigin()
    this.updateChild(timeDelta)

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

      const rtn = getCurrent(
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

  updateChild(timeDelta: number) {
    if (!this.child) this.child = this.allElements[this.childKey]

    if (!this.child.initializedInstance) return
    this.child.initializedInstance.update(timeDelta)
  }
}
