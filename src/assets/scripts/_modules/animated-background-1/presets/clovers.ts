import AnimationLibrary from "../animation-library"

export default class Clovers implements Config {
  animationLibrary
  animated
  background: { top: string; bottom: string }

  generatedRows: number
  rowLimit: number
  duration: number

  boundGenerateRowOfParticles: any
  timeout: number
  timeoutInterval: number
  columnWidth: number

  constructor(animationLibrary: AnimationLibrary) {
    this.animationLibrary = animationLibrary
    this.animated = true
    this.background = {
      top: '#94d1a5',
      bottom: '#94d1a5',
    }

    this.rowLimit = 5
    this.duration = 30000

    this.boundGenerateRowOfParticles = this.generateRowOfParticles.bind(this)
  }

  initialized() {
    this.reset()
    this.boundGenerateRowOfParticles()
  }

  reset() {
    window.clearTimeout(this.timeout)
    this.generatedRows = 0
    this.columnWidth = this.animationLibrary.canvas.width / 7
    this.timeoutInterval = this.duration / this.rowLimit
  }

  generateRowOfParticles() {
    this.generatedRows++

    const even = this.generatedRows % 2 === 0

    if (even) {
      this.generateParticle(this.columnWidth * 1 - this.columnWidth / 2, false)
      this.generateParticle(this.columnWidth * 2 - this.columnWidth / 2, true)
      this.generateParticle(this.columnWidth * 3 - this.columnWidth / 2, false)
      this.generateParticle(this.columnWidth * 4 - this.columnWidth / 2, true)
      this.generateParticle(this.columnWidth * 5 - this.columnWidth / 2, false)
      this.generateParticle(this.columnWidth * 6 - this.columnWidth / 2, true)
      this.generateParticle(this.columnWidth * 7 - this.columnWidth / 2, false)
    } else {
      this.generateParticle(this.columnWidth * 1 - this.columnWidth / 2, true)
      this.generateParticle(this.columnWidth * 2 - this.columnWidth / 2, false)
      this.generateParticle(this.columnWidth * 3 - this.columnWidth / 2, true)
      this.generateParticle(this.columnWidth * 4 - this.columnWidth / 2, false)
      this.generateParticle(this.columnWidth * 5 - this.columnWidth / 2, true)
      this.generateParticle(this.columnWidth * 6 - this.columnWidth / 2, false)
      this.generateParticle(this.columnWidth * 7 - this.columnWidth / 2, true)
    }

    if (this.generatedRows >= this.rowLimit) return
    this.timeout = window.setTimeout(this.boundGenerateRowOfParticles, this.timeoutInterval)
  }

  generateParticle(xAxis: number, large: boolean) {
    const id = this.getRandomBetween(0, 999999)

    const size = large ? 100 : 50

    this.animationLibrary.appendElement(`particle${id}`, <any>{
      type: Types.AnimationsTranslate,
      start: [ xAxis, 'canvas.height + 100' ],
      end: [ xAxis, -100 ],
      duration: [ this.duration, this.duration ],
      animate: true,
      child: `particle${id}.translate`,
      root: true,
    })

    this.animationLibrary.appendElement(`particle${id}.translate`, <any>{
      type: Types.AnimationsTranslate,
      start: [ -size / 2, -size / 2 ],
      local: true,
      child: `particle${id}.rotate`,
    })

    this.animationLibrary.appendElement(`particle${id}.rotate`, <any>{
      type: Types.AnimationsRotate,
      origin: [ size / 2, size / 2 ],
      end: large ? Math.PI * 2 : -Math.PI * 2,
      duration: 10000,
      animate: true,
      child: `particle${id}.img`,
    })

    this.animationLibrary.appendElement(`particle${id}.img`, <any>{
      type: Types.ShapesImg,
      url: 'https://webstockreview.net/images/clover-clipart-14.png',
      width: size,
      height: size,
      transparency: .2
    })
  }

  getRandomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min
  }
}
