import { PresetConfig, TimingFunction, Types } from "../types/global"

const preset: PresetConfig = {
  animation: {
    play: true,
  },
  background: {
    top: '#0028ad',
    bottom: '#ffc875',
  },
  elements: {
    bouncyBoi: {
      type: Types.AnimationsTranslate,
      animate: true,
      start: [ 'canvas.width + 200', 400 ],
      end: [ -200, 400 ],
      duration: [ 1000, 1000 ],
      timingFunction: [ TimingFunction.Cos, TimingFunction.Cos ],
      child: 'bouncyBoi.scale1',
      root: true,
    },

    'bouncyBoi.scale1': {
      type: Types.AnimationsScale,
      animate: true,
      end: [ 2, 2 ],
      duration: [ 500, 500 ],
      origin: [ 50, 50 ],
      timingFunction: [ TimingFunction.Cos, TimingFunction.Cos ],
      child: 'bouncyBoi.scale1.rotate1',
    },

    'bouncyBoi.scale1.rotate1': {
      type: Types.AnimationsRotate,
      animate: true,
      origin: [ 50, 50 ],
      child: 'bouncyBoi.scale1.rotate1.box1',
    },

    'bouncyBoi.scale1.rotate1.box1': {
      type: Types.ShapesBox,
      width: 100,
      height: 100,
    },

    bigBoi: {
      type: Types.AnimationsTranslate,
      animate: true,
      start: [ 0, -400 ],
      end: [ 'canvas.width', 'canvas.height + 400' ],
      duration: [ 5000, 5000 ],
      child: 'bigBoi.rotate1',
      root: true,
    },

    'bigBoi.rotate1': {
      type: Types.AnimationsRotate,
      animate: true,
      origin: [ 150, 150 ],
      duration: 5000,
      child: 'bigBoi.rotate1.scale1',
    },

    'bigBoi.rotate1.scale1': {
      type: Types.AnimationsScale,
      animate: true,
      end: [ 1, 2 ],
      duration: [ 500, 500 ],
      origin: [ 150, 150 ],
      timingFunction: [ TimingFunction.Cos, TimingFunction.Cos ],
      child: 'bigBoi.rotate1.scale1.box1',
    },

    'bigBoi.rotate1.scale1.box1': {
      type: Types.ShapesBox,
      width: 300,
      height: 300,
    },

    staticBoi: {
      type: Types.AnimationsTranslate,
      start: [ 'canvas.width - 300', 100 ],
      child: 'staticBoi.rotate1',
      root: true,
    },

    'staticBoi.rotate1': {
      type: Types.AnimationsRotate,
      origin: [ 100, 50 ],
      start: Math.PI / 4,
      child: 'staticBoi.rotate1.box1',
    },

    'staticBoi.rotate1.box1': {
      type: Types.ShapesBox,
      width: 200,
      height: 100,
    },

    textBoi: {
      type: Types.AnimationsTranslate,
      animate: true,
      start: [ 100, 'canvas.height' ],
      end: [ 'canvas.width', -200 ],
      duration: [ 3000, 3000 ],
      child: 'textBoi.rotate1',
      root: true,
    },

    'textBoi.rotate1': {
      type: Types.AnimationsRotate,
      animate: true,
      origin: [ 100, 50 ],
      duration: 750,
      child: 'textBoi.rotate1.text1',
    },

    'textBoi.rotate1.text1': {
      type: Types.ShapesText,
      font: '50px sans-serif',
      text: 'Wheeeeeeeeeee',
    },
  },
}

export default preset
