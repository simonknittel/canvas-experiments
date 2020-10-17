import AnimationElement from './animation-element'

export default class Translate extends AnimationElement {
  start: [number, number]
  current: [number, number]
  end: [number, number]

  loop: [number, number]
  loopCount: [number, number]

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
      if (this.loopCount[0] < this.loop[0]) {
        this.getCurrent(
          this.start[0],
          this.end[0],
          this.current[0],
          timeDelta,
          this.duration[0],
          this.elapsedTime[0],
          (current, elapsedTime, reset) => {
            this.current[0] = reset ? this.start[0] : current
            this.elapsedTime[0] = reset ? 0 : elapsedTime
            if (reset) this.loopCount[0]++
          },
          this.timingFunction[0],
        )
      }

      // Y
      if (this.loopCount[1] < this.loop[1]) {
        this.getCurrent(
          this.start[1],
          this.end[1],
          this.current[1],
          timeDelta,
          this.duration[1],
          this.elapsedTime[1],
          (current, elapsedTime, reset) => {
            this.current[1] = reset ? this.start[1] : current
            this.elapsedTime[1] = reset ? 0 : elapsedTime
            if (reset) this.loopCount[1]++
          },
          this.timingFunction[1],
        )
      }
    }

    this.ctx.translate(this.current[0], this.current[1])
  }
}
