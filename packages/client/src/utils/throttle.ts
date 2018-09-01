function throttle(fn: () => void, delay: number) {
  let last: number
  let timer: NodeJS.Timer
  return () => {
    const now = +new Date()
    if (last && now < last + delay) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn()
      }, delay)
    } else {
      last = now
      fn()
    }
  }
}

export default throttle
