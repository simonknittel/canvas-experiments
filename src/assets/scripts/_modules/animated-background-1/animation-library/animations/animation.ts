import getCurrent from "./utils/get-current"

export default class Animation {
  ctx
  allElements
  animate: boolean
  childrenKeys: string[]

  getCurrent

  constructor(
    ctx: CanvasRenderingContext2D,
    allElements: ElementCollection,
    settings: AnimationSettings
  ) {
    this.ctx = ctx
    this.allElements = allElements
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
