export default class Preset {
  constructor(those) {
    this.those = those

    this.generatedParticles = 0
    this.particleLimit = 30

    this.boundGenerateParticle = this.generateParticle.bind(this)
    this.boundGenerateParticle()
  }

  getConfig() {
    return {
      animation: {
        play: true,
      },
      background: {
        top: 'hsl(342, 100%, 75%)',
        bottom: '#ffc875',
      },
      elements: {},
    }
  }

  generateParticle() {
    const id = this.getRandomBetween(0, 999999)

    const xAxis = `Math.floor(${Math.random()} * canvas.width)`
    const size = this.getRandomBetween(20, 150)
    const duration = this.getRandomBetween(10000, 20000)

    this.those.appendElement(`particle${id}`, {
      type: 'animations/translate',
      start: [ xAxis, 'canvas.height' ],
      end: [ xAxis, -size ],
      duration: [ duration, duration ],
      animate: true,
      child: `particle${id}.rotate`,
      root: true,
    })

    this.those.appendElement(`particle${id}.rotate`, {
      type: 'animations/rotate',
      origin: [ size / 2, size / 2 ],
      duration: 10000,
      animate: true,
      child: `particle${id}.img`,
    })

    this.those.appendElement(`particle${id}.img`, {
      type: 'shapes/img',
      url: 'https://pics.clipartpng.com/Tropical_Flower_PNG_Clipart-194.png',
      width: size,
      height: size,
    })

    this.generatedParticles++
    if (this.generatedParticles >= this.particleLimit) return
    setTimeout(this.boundGenerateParticle, this.getRandomBetween(600, 800))
  }

  getRandomBetween(min, max) {
    return Math.random() * (max - min) + min
  }
}
