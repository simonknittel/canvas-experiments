import AnimationLibrary from ".";
import Rotate, { RotateSettings } from "./animations/rotate";
import Scale, { ScaleSettings } from "./animations/scale";
import Translate, { TranslateSettings } from "./animations/translate";
import Element from "./element";
import Box, { BoxSettings } from "./shapes/box";
import Img, { ImgSettings } from "./shapes/img";
import Text, { TextSettings } from "./shapes/text";

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
    children?: string[]
  }

  interface ShapeSettings extends BaseSettings {}

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
