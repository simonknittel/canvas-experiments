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

    this.rowLimit = 4
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

    const rowId = this.generatedRows

    this.animationLibrary.appendElement(`row${rowId}`, <any>{
      type: Types.AnimationsTranslate,
      start: [ 0, 'canvas.height + 100' ],
      end: [ 0, -100 ],
      duration: [ this.duration, this.duration ],
      animate: true,
      children: [
        `row${rowId}.particle1.translate`,
        `row${rowId}.particle2.translate`,
        `row${rowId}.particle3.translate`,
        `row${rowId}.particle4.translate`,
        `row${rowId}.particle5.translate`,
        `row${rowId}.particle6.translate`,
        `row${rowId}.particle7.translate`,
      ],
      root: true,
    })

    if (this.generatedRows % 2 === 0) {
      this.generateParticle(rowId, 1, false)
      this.generateParticle(rowId, 2, true)
      this.generateParticle(rowId, 3, false)
      this.generateParticle(rowId, 4, true)
      this.generateParticle(rowId, 5, false)
      this.generateParticle(rowId, 6, true)
      this.generateParticle(rowId, 7, false)
    } else {
      this.generateParticle(rowId, 1, true)
      this.generateParticle(rowId, 2, false)
      this.generateParticle(rowId, 3, true)
      this.generateParticle(rowId, 4, false)
      this.generateParticle(rowId, 5, true)
      this.generateParticle(rowId, 6, false)
      this.generateParticle(rowId, 7, true)
    }

    if (this.generatedRows >= this.rowLimit) return
    this.timeout = window.setTimeout(this.boundGenerateRowOfParticles, this.timeoutInterval)
  }

  generateParticle(rowId: number, particleId: number, large: boolean) {
    const size = large ? 100 : 50
    const xAxis = this.columnWidth * particleId - this.columnWidth / 2

    this.animationLibrary.appendElement(`row${rowId}.particle${particleId}.translate`, <any>{
      type: Types.AnimationsTranslate,
      start: [ xAxis - size / 2, - size / 2 ],
      children: [`row${rowId}.particle${particleId}.rotate`],
    })

    this.animationLibrary.appendElement(`row${rowId}.particle${particleId}.rotate`, <any>{
      type: Types.AnimationsRotate,
      origin: [ size / 2, size / 2 ],
      end: large ? Math.PI * 2 : -Math.PI * 2,
      duration: 10000,
      animate: true,
      children: [`row${rowId}.particle${particleId}.img`],
    })

    this.animationLibrary.appendElement(`row${rowId}.particle${particleId}.img`, <any>{
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
