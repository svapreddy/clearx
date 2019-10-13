import Clearx from 'clearx'

const data = {
  nums: [1, 2, 3],
  counter: 0,
  'key.has.dots.in.it': 'key with dots value',
  profile: {
    testArr: [3, 4],
    name: 'test',
    active: true
  },
  test: 1
}

const store = new Clearx(data)

export default store
