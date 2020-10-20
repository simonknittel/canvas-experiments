let analyser: AnalyserNode = undefined
let dataArray: Uint8Array = undefined

function handleSuccess(stream: MediaStream) {
  const ctx = new AudioContext();
  analyser = ctx.createAnalyser()
  const source = ctx.createMediaStreamSource(stream)
  source.connect(analyser)
  analyser.fftSize = 128
  const bufferLength = analyser.frequencyBinCount
  dataArray = new Uint8Array(bufferLength)
}

navigator.permissions
  .query({ name:'microphone' })
  .then(function(result) {
    if (result.state == 'granted') {
      navigator.mediaDevices.getUserMedia({ audio: {
        deviceId: "f0e5776245f968ee504347694f7fcaa148fb5aaf81d9ce858ceaee23055d947c" // VAIO Output
      }, video: false })
        .then(handleSuccess)
    } else if (result.state == 'prompt') {
      navigator.mediaDevices.getUserMedia({ audio: {
        deviceId: "f0e5776245f968ee504347694f7fcaa148fb5aaf81d9ce858ceaee23055d947c" // VAIO Output
      }, video: false })
        .then(handleSuccess)
    } else if (result.state == 'denied') {
      console.log('mic access blocked')
    }

    result.onchange = function() {
      navigator.mediaDevices.getUserMedia({ audio: {
        deviceId: "f0e5776245f968ee504347694f7fcaa148fb5aaf81d9ce858ceaee23055d947c" // VAIO Output
      }, video: false })
        .then(handleSuccess)
    }
  })


function getBoost() {
  if (analyser === undefined) return 0

  analyser.getByteFrequencyData(dataArray)

  let total = 0
  for (let i = 0; i < dataArray.length / 2; i++) {
    total += dataArray[i]
  }

  const zeroToOne = total / (dataArray.length / 2 * 255)
  // return Math.tan(zeroToOne)
  return zeroToOne > .5 ? zeroToOne : 0
}

function getSpeed(
  totalDistance: number,
  progress: number,
  duration: number,
  timeDelta: number,
  timingFunction?: TimingFunctions,
  audioBoost?: boolean
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

  if (audioBoost === true) return base + getBoost()
  return base
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
  audioBoost?: boolean
) {
  const totalDistance = Math.abs(end - start)
  const progress = elapsedTime / duration

  if (end > start) {
    current += getSpeed(totalDistance, progress, duration, timeDelta, timingFunction, audioBoost)
  } else if (end < start) {
    current -= getSpeed(totalDistance, progress, duration, timeDelta, timingFunction, audioBoost)
  }

  if (progress >= 1)
    return cb(current, elapsedTime, true)

  return cb(current, elapsedTime)
}
