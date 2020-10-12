import Rotate from "../animations/rotate";
import Scale from "../animations/scale";
import Translate from "../animations/translate";
import Box from "../shapes/box";
import Img from "../shapes/img";
import Text from "../shapes/text";

// export type TimingFunction = 'sin' | 'cos'

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
  root?: boolean
  initializedInstance?: Rotate | Scale | Translate | Box | Img | Text
}

export type ElementCollection = {}

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
