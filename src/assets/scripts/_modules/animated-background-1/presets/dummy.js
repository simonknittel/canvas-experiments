const preset = {
  animation: {
    play: true,
  },
  background: {
    top: '#0028ad',
    bottom: '#ffc875',
  },
  elements: {
    bouncyBoi: {
      type: 'animations/translate',
      animate: true,
      start: [ 'canvas.width + 200', 400 ],
      end: [ -200, 400 ],
      duration: [ 1000, 1000 ],
      timingFunction: [ 'cos', 'cos' ],
      child: 'bouncyBoi.scale1',
      root: true,
    },

    'bouncyBoi.scale1': {
      type: 'animations/scale',
      animate: true,
      end: [ 2, 2 ],
      duration: [ 500, 500 ],
      origin: [ 50, 50 ],
      timingFunction: [ 'cos', 'cos' ],
      child: 'bouncyBoi.scale1.rotate1',
    },

    'bouncyBoi.scale1.rotate1': {
      type: 'animations/rotate',
      animate: true,
      origin: [ 50, 50 ],
      child: 'bouncyBoi.scale1.rotate1.box1',
    },

    'bouncyBoi.scale1.rotate1.box1': {
      type: 'shapes/box',
      width: 100,
      height: 100,
    },

    bigBoi: {
      type: 'animations/translate',
      animate: true,
      start: [ 0, -400 ],
      end: [ 'canvas.width', 'canvas.height + 400' ],
      duration: [ 5000, 5000 ],
      child: 'bigBoi.rotate1',
      root: true,
    },

    'bigBoi.rotate1': {
      type: 'animations/rotate',
      animate: true,
      origin: [ 150, 150 ],
      duration: 5000,
      child: 'bigBoi.rotate1.scale1',
    },

    'bigBoi.rotate1.scale1': {
      type: 'animations/scale',
      animate: true,
      end: [ 1, 2 ],
      duration: [ 500, 500 ],
      origin: [ 150, 150 ],
      timingFunction: [ 'cos', 'cos' ],
      child: 'bigBoi.rotate1.scale1.box1',
    },

    'bigBoi.rotate1.scale1.box1': {
      type: 'shapes/box',
      width: 300,
      height: 300,
    },

    staticBoi: {
      type: 'animations/translate',
      start: [ 'canvas.width - 300', 100 ],
      child: 'staticBoi.rotate1',
      root: true,
    },

    'staticBoi.rotate1': {
      type: 'animations/rotate',
      origin: [ 100, 50 ],
      start: Math.PI / 4,
      child: 'staticBoi.rotate1.box1',
    },

    'staticBoi.rotate1.box1': {
      type: 'shapes/box',
      width: 200,
      height: 100,
    },

    textBoi: {
      type: 'animations/translate',
      animate: true,
      start: [ 100, 'canvas.height' ],
      end: [ 'canvas.width', -200 ],
      duration: [ 3000, 3000 ],
      child: 'textBoi.rotate1',
      root: true,
    },

    'textBoi.rotate1': {
      type: 'animations/rotate',
      animate: true,
      origin: [ 100, 50 ],
      duration: 750,
      child: 'textBoi.rotate1.text1',
    },

    'textBoi.rotate1.text1': {
      type: 'shapes/text',
      font: '50px sans-serif',
      text: 'Wheeeeeeeeeee',
    },
  },
}

export default preset
