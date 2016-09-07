import test from 'ava'
import isOnline from './'

test.cb(t => {
  t.plan(2)
  isOnline((err, online) => {
    t.falsy(err)
    t.true(online)
    t.end()
  })
})
