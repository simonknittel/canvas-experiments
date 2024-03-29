export default class Dummy implements Config {
  animated
  background: { top: string; bottom: string }
  elements: ElementCollection

  constructor() {
    this.animated = true

    this.background = { top: '#0028ad', bottom: '#ffc875' }

    this.elements = {
      bouncyBoi: <any>{
        type: Types.AnimationsTranslate,
        animate: true,
        start: [ 'canvas.width + 200', 400 ],
        end: [ -200, 400 ],
        duration: [ 1000, 1000 ],
        timingFunction: [ TimingFunctions.Cos, TimingFunctions.Cos ],
        childrenKeys: ['bouncyBoi.scale1'],
        root: true,
      },

      'bouncyBoi.scale1': <any>{
        type: Types.AnimationsScale,
        animate: true,
        end: [ 2, 2 ],
        duration: [ 500, 500 ],
        origin: [ 50, 50 ],
        timingFunction: [ TimingFunctions.Cos, TimingFunctions.Cos ],
        childrenKeys: ['bouncyBoi.scale1.rotate1'],
      },

      'bouncyBoi.scale1.rotate1': <any>{
        type: Types.AnimationsRotate,
        animate: true,
        origin: [ 50, 50 ],
        childrenKeys: ['bouncyBoi.scale1.rotate1.box1'],
      },

      'bouncyBoi.scale1.rotate1.box1': <any>{
        type: Types.ShapesBox,
        width: 100,
        height: 100,
      },

      bigBoi: <any>{
        type: Types.AnimationsTranslate,
        animate: true,
        start: [ 0, -400 ],
        end: [ 'canvas.width', 'canvas.height + 400' ],
        duration: [ 5000, 5000 ],
        childrenKeys: ['bigBoi.rotate1'],
        root: true,
      },

      'bigBoi.rotate1': <any>{
        type: Types.AnimationsRotate,
        animate: true,
        origin: [ 150, 150 ],
        duration: 5000,
        childrenKeys: ['bigBoi.rotate1.scale1'],
      },

      'bigBoi.rotate1.scale1': <any>{
        type: Types.AnimationsScale,
        animate: true,
        end: [ 1, 2 ],
        duration: [ 500, 500 ],
        origin: [ 150, 150 ],
        timingFunction: [ TimingFunctions.Cos, TimingFunctions.Cos ],
        childrenKeys: ['bigBoi.rotate1.scale1.box1'],
      },

      'bigBoi.rotate1.scale1.box1': <any>{
        type: Types.ShapesBox,
        width: 300,
        height: 300,
      },

      staticBoi: <any>{
        type: Types.AnimationsTranslate,
        start: [ 'canvas.width - 300', 100 ],
        childrenKeys: ['staticBoi.rotate1'],
        root: true,
      },

      'staticBoi.rotate1': <any>{
        type: Types.AnimationsRotate,
        origin: [ 100, 50 ],
        start: Math.PI / 4,
        childrenKeys: ['staticBoi.rotate1.box1'],
      },

      'staticBoi.rotate1.box1': <any>{
        type: Types.ShapesBox,
        width: 200,
        height: 100,
      },

      textBoi: <any>{
        type: Types.AnimationsTranslate,
        animate: true,
        start: [ 100, 'canvas.height' ],
        end: [ 'canvas.width', -200 ],
        duration: [ 3000, 3000 ],
        childrenKeys: ['textBoi.rotate1'],
        root: true,
      },

      'textBoi.rotate1': <any>{
        type: Types.AnimationsRotate,
        animate: true,
        origin: [ 100, 50 ],
        duration: 750,
        childrenKeys: ['textBoi.rotate1.text1'],
      },

      'textBoi.rotate1.text1': <any>{
        type: Types.ShapesText,
        font: '50px sans-serif',
        text: 'Wheeeeeeeeeee',
      },
    }
  }
}
