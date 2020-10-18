import AnimationLibrary from "../animation-library"
import Element from "../animation-library/element"

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

  constructor (animationLibrary: AnimationLibrary) {
    this.animationLibrary = animationLibrary
    this.animated = true

    this.rowLimit = 4
    this.duration = 30000

    this.boundGenerateRowOfParticles = this.generateRowOfParticles.bind(this)
  }

  initialized() {
    this.reset()
    this.generateBackground()
    this.generateFPSCounter()
    this.boundGenerateRowOfParticles()
  }

  reset() {
    window.clearTimeout(this.timeout)
    this.generatedRows = 0
    this.columnWidth = this.animationLibrary.canvas.width / 7
    this.timeoutInterval = this.duration / this.rowLimit
  }

  generateBackground() {
    this.animationLibrary.appendElement('background', <any>{
      type: 'custom',
      class: class Background extends Element {
        update() {
          const ctx = this.ctx
          const canvas = this.canvas

          ctx.save()

          ctx.fillStyle = '#94d1a5'
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          ctx.restore()
        }
      },
      root: true
    })
  }

  generateFPSCounter() {
    this.animationLibrary.appendElement('fps.translate', <TranslateSettings>{
      type: Types.AnimationsTranslate,
      start: [ 10, 24 ],
      childrenKeys: ['fps'],
      root: true
    })

    this.animationLibrary.appendElement('fps', <FPSSettings>{
      type: Types.ElementsFPS,
    })
  }

  generateRowOfParticles() {
    this.generatedRows++

    const rowId = this.generatedRows

    this.animationLibrary.appendElement(`row${rowId}`, <TranslateSettings>{
      type: Types.AnimationsTranslate,
      start: [0, this.animationLibrary.canvas.height + 100],
      end: [0, -100],
      duration: [this.duration, this.duration],
      animate: true,
      loop: [Infinity, Infinity],
      audioBoost: [false, true],
      childrenKeys: [
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

    this.timeout = window.setTimeout(
      this.boundGenerateRowOfParticles,
      this.timeoutInterval
    )
  }

  generateParticle(rowId: number, particleId: number, large: boolean) {
    const size = this.animationLibrary.canvas.width / (large ? 20 : 40)
    const xAxis = this.columnWidth * particleId - this.columnWidth / 2

    this.animationLibrary.appendElement(`row${rowId}.particle${particleId}.translate`, <TranslateSettings>{
      type: Types.AnimationsTranslate,
      start: [xAxis - size / 2, - size / 2],
      childrenKeys: [`row${rowId}.particle${particleId}.rotate`],
    })

    this.animationLibrary.appendElement(`row${rowId}.particle${particleId}.rotate`, <RotateSettings>{
      type: Types.AnimationsRotate,
      origin: [size / 2, size / 2],
      end: large ? Math.PI * 2 : -Math.PI * 2,
      duration: 10000,
      audioBoost: false,
      animate: true,
      loop: Infinity,
      childrenKeys: [`row${rowId}.particle${particleId}.img`],
    })

    this.animationLibrary.appendElement(`row${rowId}.particle${particleId}.img`, <ImgSettings>{
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
