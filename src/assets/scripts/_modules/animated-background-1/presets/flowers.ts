import AnimationLibrary from "../animation-library"

export default class Flowers implements Config {
  animationLibrary: AnimationLibrary
  animated: boolean
  background: { top: string; bottom: string }

  generatedParticles: number
  particleLimit: number

  boundGenerateParticle: any

  timeout: number

  constructor(animationLibrary: AnimationLibrary) {
    this.animationLibrary = animationLibrary
    this.animated = true
    this.background = {
      top: 'hsl(342, 100%, 75%)',
      bottom: '#ffc875',
    }

    this.generatedParticles = 0
    this.particleLimit = 30

    this.boundGenerateParticle = this.generateParticle.bind(this)
  }

  initialized() {
    this.reset()
    this.boundGenerateParticle()
  }

  reset() {
    window.clearTimeout(this.timeout)
    this.generatedParticles = 0
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
      child: `particle${id}.translate`,
      root: true,
    })

    this.animationLibrary.appendElement(`particle${id}.translate`, <any>{
      type: Types.AnimationsTranslate,
      end: [ 200, 0 ],
      duration: [ 5000, 5000 ],
      animate: true,
      timingFunction: [ TimingFunction.Cos, TimingFunction.Cos ],
      local: true,
      child: `particle${id}.rotate`,
    })

    this.animationLibrary.appendElement(`particle${id}.rotate`, <any>{
      type: Types.AnimationsRotate,
      origin: [ size / 2, size / 2 ],
      end: rand >= .5 ? Math.PI * 2 : -Math.PI * 2,
      duration: 10000,
      animate: true,
      child: `particle${id}.img`,
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
