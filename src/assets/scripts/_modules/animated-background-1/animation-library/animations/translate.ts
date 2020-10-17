import AnimationElement from './animation-element'

export default class Translate extends AnimationElement {
  start: [number, number]
  current: [number, number]
  end: [number, number]

  loop: [number, number]
  loopCount: [number, number]
  loopCallback: [ Function | undefined, Function | undefined ]

  timingFunction: [TimingFunctions, TimingFunctions] | []
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

    this.loop = settings.loop || [ 0, 0 ]
    this.loopCount = [ -1, -1 ]
    this.loopCallback = settings.loopCallback || [ undefined, undefined ]

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

      this.updateColumn(0, timeDelta) // X
      this.updateColumn(1, timeDelta) // X
    }

    this.ctx.translate(this.current[0], this.current[1])
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
