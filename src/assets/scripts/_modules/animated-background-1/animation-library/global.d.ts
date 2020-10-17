import AnimationLibrary from ".";
import Rotate from "./animations/rotate";
import Scale from "./animations/scale";
import Translate from "./animations/translate";
import Box from "./shapes/box";
import Img from "./shapes/img";
import Text from "./shapes/text";

declare global {
  const enum TimingFunctions {
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

  interface BaseSettings {
    type: Types | 'custom'
    class?: any
    root?: boolean
    initializedInstance?:
      | Rotate
      | Scale
      | Translate
      | Box
      | Img
      | Text
  }

  interface AnimationSettings extends BaseSettings {
    animate?: boolean
    childrenKeys?: string[]
  }

  interface RotateSettings extends AnimationSettings {
    start?: number
    end?: number
    loop?: number
    timingFunction: TimingFunctions
    duration?: number
    origin?: [number, number]
  }

  interface ScaleSettings extends AnimationSettings {
    start?: [number, number]
    end: [number, number]
    loop?: [number, number]
    timingFunction?: [TimingFunctions, TimingFunctions]
    duration?: [number, number]
    origin?: [number, number]
  }

  interface TranslateSettings extends AnimationSettings {
    start?: [number, number]
    end?: [number, number]
    loop?: [number, number]
    timingFunction?: [TimingFunctions, TimingFunctions]
    duration?: [number, number]
    origin?: [number, number]
    local?: boolean
  }

  interface ShapeSettings extends BaseSettings {}

  interface BoxSettings extends ShapeSettings {
    width?: number
    height?: number
    fillStyle?: string
    transparency?: number
  }

  interface ImgSettings extends ShapeSettings {
    url: string
    width: number
    height: number
    transparency?: number
  }

  interface TextSettings extends ShapeSettings {
    font: string
    text: string
  }

  type Settings =
    | BaseSettings
    | AnimationSettings
    | RotateSettings
    | ScaleSettings
    | TranslateSettings
    | ShapeSettings
    | BoxSettings
    | ImgSettings
    | TextSettings

  type ElementCollection = {
    [id: string]: Settings
  }

  interface ConfigConstructor {
    new(animationLibrary: AnimationLibrary): Config
  }

  interface Config {
    animationLibrary?: AnimationLibrary
    animated?: boolean
    elements?: ElementCollection

    initialized?: Function
  }
}
