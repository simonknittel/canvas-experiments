export default class Element {
  canvas
  ctx
  allElements

  // update: Function

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    allElements: ElementCollection
  ) {
    this.canvas = canvas
    this.ctx = ctx
    this.allElements = allElements
  }
}
