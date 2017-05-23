import 'babel-regenerator-runtime'

export default function* range(low, high) {
  for (let i = low; i <= high; i++) {
    yield i
  }
}
