export function getRandom<T>(array: T[]): T {
  return shuffleArray(array)[0]
}

export function shuffleArray<T>(original: T[]): T[] {
  let array = original.slice(0)

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array
}
