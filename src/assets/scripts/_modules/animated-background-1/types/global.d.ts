import Rotate from "../animations/rotate";
import Scale from "../animations/scale";
import Translate from "../animations/translate";
import Box from "../shapes/box";
import Img from "../shapes/img";
import Text from "../shapes/text";

export enum TimingFunction {
  Sin = 'sin',
  Cos = 'cos'
}

export enum Types {
  AnimationsRotate = 'animations/rotate',
  AnimationsScale = 'animations/Scale',
  AnimationsTranslate = 'animations/translate',
  ShapesBox = 'shapes/box',
  ShapesImg = 'shapes/img',
  ShapesText = 'shapes/text',
}

export interface ElementConfig {
  type: Types

  animate?: boolean
  start?: [number|string, number|string] | number | string
  end?: [number|string, number|string] | number | string
  duration?: [number|string, number|string] | number | string
  timingFunction?: [TimingFunction, TimingFunction]
  origin?: [number|string, number|string] | number | string

  width?: number
  height?: number
  font?: string
  text?: string

  child?: string
  root?: boolean
  initializedInstance?: Rotate | Scale | Translate | Box | Img | Text
}

export type ElementCollection = {
  [id: string]: ElementConfig
}

export interface PresetConfig {
  animation: {
    play: boolean
  }
  background: {
    top: string
    bottom: string
  }
  elements: ElementCollection
}
