import AnimationLibrary from ".";
import Rotate from "./animations/rotate";
import Scale from "./animations/scale";
import Translate from "./animations/translate";
import Box from "./shapes/box";
import Img from "./shapes/img";
import Text from "./shapes/text";

declare global {
  const enum TimingFunction {
    Sin = 'sin',
    Cos = 'cos'
  }

  const enum Types {
    AnimationsRotate = 'animations/rotate',
    AnimationsScale = 'animations/Scale',
    AnimationsTranslate = 'animations/translate',
    ShapesBox = 'shapes/box',
    ShapesImg = 'shapes/img',
    ShapesText = 'shapes/text',
  }

  interface ElementConfig {
    type: Types

    animate?: boolean
    // start?: [number|string, number|string] | number | string
    // end?: [number|string, number|string] | number | string
    // duration?: [number|string, number|string] | number | string
    // timingFunction?: [TimingFunction, TimingFunction]
    // origin?: [number|string, number|string] | number | string
    start?: any
    end?: any
    duration?: any
    timingFunction?: [TimingFunction, TimingFunction]
    origin?: any

    width?: number
    height?: number
    font?: string
    text?: string
    url?: string

    child?: string
    root?: boolean
    initializedInstance?: Rotate | Scale | Translate | Box | Img | Text
  }

  type ElementCollection = {
    [id: string]: ElementConfig
  }

  interface ConfigConstructor {
    new(animationLibrary: AnimationLibrary): Config
  }

  interface Config {
    animationLibrary?: AnimationLibrary

    animated?: boolean

    background: { top: string, bottom: string }

    elements?: ElementCollection
  }
}
