import Box from './box.js'
import Rotate from './rotate.js'
import Scale from './scale.js'

import getCurrent from './utils/get-current.js'

export default class Translate {
  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} settings
   * @param {Number[]} settings.start
   * @param {Number[]} settings.end
   * @param {Number} settings.duration
   * @param {Box|Rotate|Scale} settings.content
   */
  constructor(ctx, settings) {
    this.ctx = ctx

    this.start = settings.start || [ 0, 0 ]
    this.current = [ ...this.start ]
    this.end = settings.end

    this.duration = settings.duration || 5000

    this.content = settings.content

    // TODO: Add possibility to specify a timing function
  }

  update(timeDelta = 0) {
    this.ctx.save()
    this.translate(timeDelta)
    this.content.update(timeDelta)
    this.ctx.restore()
  }

  translate(timeDelta) {
    if (this.end) {
      // X
      this.current[0] = getCurrent(
        this.start[0],
        this.end[0],
        this.current[0],
        timeDelta,
        this.duration,
      )

      // Y
      this.current[1] = getCurrent(
        this.start[1],
        this.end[1],
        this.current[1],
        timeDelta,
        this.duration,
      )
    }

    this.ctx.translate(this.current[0], this.current[1])
  }
}
