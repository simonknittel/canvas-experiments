import AnimationElement from './animation-element'

export default class Scale extends AnimationElement {
  start: [number, number]
  current: [number, number]
  end: [number, number]

  loop: [number, number]
  loopCount: [number, number]
  loopCallback: [ Function | undefined, Function | undefined ]

  timingFunction: [TimingFunctions, TimingFunctions] | []
  duration: [number, number]
  elapsedTime: [number, number]

  origin: [number, number]

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    allElements: ElementCollection,
    settings: ScaleSettings
  ) {
    super(canvas, ctx, allElements, settings)

    this.start = settings.start || [ 1, 1 ]
    this.current = [ ...this.start ]
    this.end = settings.end || [ 2, 2 ]

    this.loop = settings.loop || [ 0, 0 ]
    this.loopCount = [ -1, -1 ]

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

      this.updateColumn(0, timeDelta) // X
      this.updateColumn(1, timeDelta) // X
    }

    this.ctx.scale(this.current[0], this.current[1])
  }

  updateColumn(column: number, timeDelta: number) {
    if (this.loopCount[column] < this.loop[column]) {
      this.getCurrent(
        this.start[column],
        this.end[column],
        this.current[column],
        timeDelta,
        this.duration[column],
        this.elapsedTime[column],
        (current, elapsedTime, reset) => {
          this.current[column] = reset ? this.start[column] : current
          this.elapsedTime[column] = reset ? 0 : elapsedTime

          if (reset) {
            this.loopCount[column]++
            if (typeof this.loopCallback[column] === 'function') this.loopCallback[column]()
          }
        },
        this.timingFunction[column],
      )
    }
  }
}
