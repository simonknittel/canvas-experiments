import { TimingFunction } from "../../types/global"

// TODO: React to audio
function getBoost() {
  return 0
}

function getSpeed(
  totalDistance: number,
  progress: number,
  duration: number,
  timeDelta: number,
  timingFunction?: TimingFunction
) {
  let base = totalDistance / duration * timeDelta

  switch (timingFunction) {
    case 'cos':
      base *= Math.cos(2 * Math.PI * progress)
      break

    case 'sin':
      base *= Math.sin(2 * Math.PI * progress)
      break
  }

  return base + getBoost()
}

export default function getCurrent(
  start: number,
  end: number,
  current: number,
  timeDelta: number,
  duration: number,
  elapsedTime: number,
  timingFunction?: TimingFunction
) {
  const totalDistance = Math.abs(end - start)
  const progress = elapsedTime / duration

  if (end > start) {
    current += getSpeed(totalDistance, progress, duration, timeDelta, timingFunction)
  } else if (end < start) {
    current -= getSpeed(totalDistance, progress, duration, timeDelta, timingFunction)
  }

  // Reset if end has been reached
  if (progress >= 1) // eslint-disable-line curly
    return { current: start, elapsedTime: 0 } // eslint-disable-line object-property-newline

  return { current, elapsedTime } // eslint-disable-line object-property-newline
}
