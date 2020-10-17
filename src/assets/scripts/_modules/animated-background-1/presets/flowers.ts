import AnimationLibrary from "../animation-library"
import Element from "../animation-library/element"

export default class Flowers implements Config {
  animationLibrary
  animated

  generatedParticles: number
  particleLimit: number

  boundGenerateParticle: any

  timeout: number

  constructor(animationLibrary: AnimationLibrary) {
    this.animationLibrary = animationLibrary
    this.animated = true

    this.generatedParticles = 0
    this.particleLimit = 30

    this.boundGenerateParticle = this.generateParticle.bind(this)
  }

  initialized() {
    this.reset()
    this.generateBackground()
    this.boundGenerateParticle()
  }

  reset() {
    window.clearTimeout(this.timeout)
    this.generatedParticles = 0
  }

  generateBackground() {
    this.animationLibrary.appendElement('background', <any>{
      type: 'custom',
      class: class Background extends Element {
        update() {
          const ctx = this.ctx
          const canvas = this.canvas

          ctx.save()

          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
          gradient.addColorStop(0, 'hsl(342, 100%, 75%)')
          gradient.addColorStop(1, '#ffc875')

          ctx.fillStyle = gradient
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          ctx.restore()
        }
      },
      root: true
    })
  }

  generateParticle() {
    const id = this.getRandomBetween(0, 999999)

    const rand = Math.random()

    const xAxis = `Math.floor(${rand} * canvas.width)`
    const size = this.getRandomBetween(20, 150)
    const duration = this.getRandomBetween(10000, 20000)

    this.animationLibrary.appendElement(`particle${id}`, <any>{
      type: Types.AnimationsTranslate,
      start: [ xAxis, 'canvas.height' ],
      end: [ xAxis, -size ],
      duration: [ duration, duration ],
      animate: true,
      childrenKeys: [`particle${id}.translate`],
      root: true,
    })

    this.animationLibrary.appendElement(`particle${id}.translate`, <any>{
      type: Types.AnimationsTranslate,
      end: [ 200, 0 ],
      duration: [ 5000, 5000 ],
      animate: true,
      timingFunction: [ TimingFunctions.Cos, TimingFunctions.Cos ],
      local: true,
      childrenKeys: [`particle${id}.rotate`],
    })

    this.animationLibrary.appendElement(`particle${id}.rotate`, <any>{
      type: Types.AnimationsRotate,
      origin: [ size / 2, size / 2 ],
      end: rand >= .5 ? Math.PI * 2 : -Math.PI * 2,
      duration: 10000,
      animate: true,
      childrenKeys: [`particle${id}.img`],
    })

    this.animationLibrary.appendElement(`particle${id}.img`, <any>{
      type: Types.ShapesImg,
      url: 'https://pics.clipartpng.com/Tropical_Flower_PNG_Clipart-194.png',
      width: size,
      height: size,
    })

    this.generatedParticles++
    if (this.generatedParticles >= this.particleLimit) return
    this.timeout = window.setTimeout(this.boundGenerateParticle, this.getRandomBetween(600, 800))
  }

  getRandomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min
  }
}
