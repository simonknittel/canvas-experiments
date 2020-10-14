import { ScaleSettings } from './animations/scale';
import { TranslateSettings } from './animations/translate';
export default class ElementsInitializer {
  elements: ElementCollection
  ctx
  canvas

  constructor(
    elements: ElementCollection,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) {
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

  initialize(key: string) {
    this.populateElementConfig(key)
    this.createInstance(key)
  }

  populateElementConfig(key: string) {
    const config = this.elements[key]
    if ([
      'animations/translate',
      'animations/scale',
    ].indexOf(config.type) >= 0) {
      // if (config.start) config.start = config.start.map(this.replaceValue.bind(this))
      // if (config.end) config.end = config.end.map(this.replaceValue.bind(this))
      // if (config.duration) config.duration = config.duration.map(this.replaceValue.bind(this))

      if ('start' in config) {
        const c = config as ScaleSettings | TranslateSettings
        if (Array.isArray(c.start)) {
          c.start = <[number, number]>c.start.map(this.replaceValue.bind(this))
        }
      }

      if ('end' in config) {
        const c = config as ScaleSettings | TranslateSettings
        if (Array.isArray(c.end)) {
          c.end = <[number, number]>c.end.map(this.replaceValue.bind(this))
        }
      }

      if ('duration' in config) {
        const c = config as ScaleSettings | TranslateSettings
        if (Array.isArray(c.duration)) {
          c.duration = <[number, number]>c.duration.map(this.replaceValue.bind(this))
        }
      }
    }
  }

  replaceValue(value: string): number {
    if (typeof value === 'number') return value

    let replacedValue = value
    replacedValue = replacedValue.replace(/canvas\.width/g, this.canvas.width.toString())
    replacedValue = replacedValue.replace(/canvas\.height/g, this.canvas.height.toString())

    return eval(replacedValue)
  }

  createInstance(key: string) {
    const config = this.elements[key]
    const Cls = require(`./${config.type}.ts`).default
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

  appendElement(key: string, config: Settings) {
    this.elements[key] = config
    this.populateElementConfig(key)
    this.createInstance(key)
  }
}
