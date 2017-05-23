import expect from 'expect'
import jsdom from 'jsdom'
import 'babel-regenerator-runtime'

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

export default function expectAsync(...promises) {
  let rejected = false
  Promise.all(promises).catch(() => {
    rejected = true
  })

  Promise.runAll()
  expect(rejected).toBe(false)
}
