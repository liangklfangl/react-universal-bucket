import expect from 'expect'
import jsdom from 'jsdom'

const document = global.document = jsdom.jsdom('')
global.window = document.defaultView
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}

export default function expectAsync(promise) {
  let rejected = false
  promise.catch(() => {
    rejected = true
  })

  Promise.runAll()
  expect(rejected).toBe(false)
}
