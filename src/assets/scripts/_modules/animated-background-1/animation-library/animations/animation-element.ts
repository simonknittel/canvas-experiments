import Element from "../element"
import getCurrent from "./utils/get-current"

export default class AnimationElement extends Element {
  animate: boolean
  childrenKeys: string[]

  getCurrent

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    allElements: ElementCollection,
    settings: AnimationSettings
  ) {
    super(canvas, ctx, allElements)

    this.animate = settings.animate || false
    this.childrenKeys = settings.children

    this.getCurrent = getCurrent
  }

  updateChildren(timeDelta: number) {
    this.childrenKeys.forEach(childKey => {
      const child = this.allElements[childKey]
      if (!child.initializedInstance) return
      child.initializedInstance.update(timeDelta)
    })
  }
}
