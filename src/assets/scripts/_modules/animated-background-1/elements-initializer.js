export default class ElementsInitializer {
  /**
   *
   * @param {Object} elements
   * @param {CanvasRenderingContext2D} ctx
   * @param {HTMLCanvasElement} canvas
   */
  constructor(elements, ctx, canvas) {
    this.elements = Object.assign({}, elements)
    this.ctx = ctx
    this.canvas = canvas

    this.initializeElements()
  }

  initializeElements() {
    Object
      .keys(this.elements)
      .forEach(this.initialize.bind(this))
  }

  initialize(key) {
    this.populateElementConfig(key)
    this.createInstance(key)
  }

  populateElementConfig(key) {
    const config = this.elements[key]
    if ([
      'animations/translate',
      'animations/scale',
    ].indexOf(config.type) >= 0) {
      if (config.start) config.start = config.start.map(this.replaceValue.bind(this))
      if (config.end) config.end = config.end.map(this.replaceValue.bind(this))
      if (config.duration) config.duration = config.duration.map(this.replaceValue.bind(this))
    }
  }

  replaceValue(value) {
    if (typeof value === 'number') return value

    let replacedValue = value
    replacedValue = replacedValue.replace(/canvas\.width/g, this.canvas.width)
    replacedValue = replacedValue.replace(/canvas\.height/g, this.canvas.height)

    return eval(replacedValue)
  }

  createInstance(key) {
    const config = this.elements[key]
    const Cls = require(`./${config.type}.js`).default
    config.initializedInstance = new Cls(this.ctx, this.elements, config)
  }

  getRootElements() {
    const rootElements = {}

    for (const key in this.elements) {
      if (!this.elements.hasOwnProperty(key)) continue
      if (!this.elements[key].root) continue
      rootElements[key] = this.elements[key]
    }

    return rootElements
  }

  appendElement(key, config) {
    this.elements[key] = config
    this.populateElementConfig(key)
    this.createInstance(key)
  }
}
