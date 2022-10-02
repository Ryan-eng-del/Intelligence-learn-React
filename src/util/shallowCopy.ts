export function shallowCopy<T>(from: T, to: T) {
  for (const key in from) {
    to[key] = from[key]
  }
}
