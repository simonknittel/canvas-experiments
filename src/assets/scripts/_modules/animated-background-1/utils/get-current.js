export default function getCurrent(start, end, current, timeDelta, duration) {
  if (end > start) {
    const distance = end - start
    const speed = distance / duration * timeDelta
    current += speed

    // Reset if end has been reached
    if (current > end) {
      return start
    }
  } else if (end < start) {
    const distance = start - end
    const speed = distance / duration * timeDelta
    current -= speed

    // Reset if end has been reached
    if (current < end) {
      return start
    }
  }

  return current
}
