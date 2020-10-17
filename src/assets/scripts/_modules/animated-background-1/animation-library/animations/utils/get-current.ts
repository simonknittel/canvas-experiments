// TODO: React to audio
function getBoost() {
  return 0
}

function getSpeed(
  totalDistance: number,
  progress: number,
  duration: number,
  timeDelta: number,
  timingFunction?: TimingFunctions
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

interface Callback {
  (current: number, elapsedTime: number, reset?: boolean): void
}

export default function getCurrent(
  start: number,
  end: number,
  current: number,
  timeDelta: number,
  duration: number,
  elapsedTime: number,
  cb: Callback,
  timingFunction?: TimingFunctions,
) {
  const totalDistance = Math.abs(end - start)
  const progress = elapsedTime / duration

  if (end > start) {
    current += getSpeed(totalDistance, progress, duration, timeDelta, timingFunction)
  } else if (end < start) {
    current -= getSpeed(totalDistance, progress, duration, timeDelta, timingFunction)
  }

  if (progress >= 1)
    return cb(current, elapsedTime, true)

  return cb(current, elapsedTime)
}
