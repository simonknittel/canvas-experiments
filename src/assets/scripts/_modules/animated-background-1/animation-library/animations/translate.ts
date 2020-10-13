import getCurrent from './utils/get-current'

interface Settings {
  animate?: boolean
  start?: [number, number]
  end?: [number, number]
  timingFunction?: [TimingFunction, TimingFunction]
  duration?: [number, number]
  origin?: [number, number]
  child: string
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

  childKey: string
  child: ElementConfig

  constructor(
    ctx: CanvasRenderingContext2D,
    allElements: object,
    settings: Settings
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

    this.childKey = settings.child
  }

  update(timeDelta = 0) {
    this.ctx.save()

    this.translate(timeDelta)
    this.updateChild(timeDelta)

    this.ctx.restore()
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
