import ClearX from './dist/ClearX.js'
import test from 'ava'

// JSON data taken from https://json.org/example.html
let appStore = new ClearX({
  'glossary': {
    'title': 'example glossary',
    'GlossDiv': {
      'title': 'S',
      'GlossList': {
        'GlossEntry': {
          'test': 'test',
          'ID': 'SGML',
          'SortAs': 'SGML',
          'GlossTerm': 'Standard Generalized Markup Language',
          'Acronym': 'SGML',
          'Abbrev': 'ISO 8879:1986',
          'GlossDef': {
            'para': 'A meta-markup language, used to create markup languages such as DocBook.',
            'GlossSeeAlso': ['GML', 'XML']
          },
          'GlossSee': 'markup'
        }
      }
    }
  }
})

test('#React UI component', (t) => {
  let p = ['glossary', 'GlossDiv', 'GlossList', 'GlossEntry', 'test']
  
  let setStateCalled = false
  let setState = () => {
    setStateCalled = true
  }
  class Cls {
    constructor () {
      this.isReactComponent = true
      this.sliced = appStore.slice({
        GlossEntryTest: p
      }, this)
    }
    setState (data, afterCb) {
      this.state = data
      setState()
      afterCb && afterCb()
    }
  }
  
  let instance = new Cls()
  t.deepEqual(appStore.get(p), instance.state.store.GlossEntryTest)
  appStore.set(p, 'test2')
  t.deepEqual(instance.state.store.GlossEntryTest, 'test2')
  t.is(setStateCalled, true)
  setStateCalled = false
  appStore.set(p, 'test2')
  t.is(setStateCalled, false)
  instance.sliced.setState({
    store: {
      GlossEntryTest: 'test3'
    }
  })
  t.is(setStateCalled, true)
  t.deepEqual(appStore.get(p), 'test3')
})

test('#slice() with Class', (t) => {
  let p = ['glossary', 'GlossDiv', 'GlossList', 'GlossEntry', 'GlossDef']
  let p2 = ['glossary', 'GlossDiv', 'title']
  t.deepEqual(appStore.get(p2), 'S')
  let called = false
  class Cls {
    constructor () {
      appStore.slice({
        GlossDef: p,
        GlossDivTitle: p2
      }, this, {
        defaults: {
          GlossDivTitle: 'testTitle'
        },
        updateCallback: () => {
          called = true
        }
      })
    }
  }
  let instance = new Cls()
  t.deepEqual(instance.store.GlossDef, appStore.get(p))
  t.deepEqual(appStore.get(p2), 'testTitle')
  appStore.set(p2, 'another')
  t.deepEqual(called, true)
})

test('#get(key)', (t) => {
  t.deepEqual(appStore.get(['glossary', 'GlossDiv', 'GlossList', 'GlossEntry', 'GlossDef', 'GlossSeeAlso']), ['GML', 'XML'])
})

test('#get(key, defaultValue)', (t) => {
  t.deepEqual(appStore.get(['a', 'b'], 'default'), 'default')
})

test('#set(key, value)', (t) => {
  let key = ['glossary', 'title']
  t.deepEqual(appStore.get(key), 'example glossary')
  appStore.set(key, 'example')
  t.deepEqual(appStore.get(key), 'example')
  appStore.set(key, 'example glossary')
})

test('#empty(key)', (t) => {
  appStore.set(['a'], {x: 1})
  appStore.set(['b'], 'test')
  appStore.set(['c'], [1, 2, 3])
  t.deepEqual(appStore.get(['a']), {x: 1})
  t.deepEqual(appStore.get(['b']), 'test')
  t.deepEqual(appStore.get(['c']), [1, 2, 3])
  appStore.empty(['a'])
  appStore.empty(['b'])
  appStore.empty(['c'])
  t.deepEqual(appStore.get(['a']), {})
  t.deepEqual(appStore.get(['b']), '')
  t.deepEqual(appStore.get(['c']), [])
})

test('#del(key)', (t) => {
  appStore.set(['d'], {x: 1})
  appStore.set(['e'], [1, 2, 3])
  t.deepEqual(appStore.get(['d']), {x: 1})
  t.deepEqual(appStore.get(['e']), [1, 2, 3])
  appStore.del(['d', 'x'])
  appStore.del(['e', 0])
  t.deepEqual(appStore.get(['d']), {})
  t.deepEqual(appStore.get(['e']), [2, 3])
})

test('#insert(key, value, pos)', (t) => {
  appStore.set(['f'], [1, 2, 3])
  t.deepEqual(appStore.get(['f']), [1, 2, 3])
  appStore.insert(['f'], 'test', 0)
  t.deepEqual(appStore.get(['f']), ['test', 1, 2, 3])
})

test('#push(key, value)', (t) => {
  appStore.set(['g'], [1, 2, 3])
  t.deepEqual(appStore.get(['g']), [1, 2, 3])
  appStore.push(['g'], 'test', 'test2')
  t.deepEqual(appStore.get(['g']), [1, 2, 3, 'test', 'test2'])
})

test('#ensureExists(key, defaultValue)', (t) => {
  let p = ['glossary', 'title']
  appStore.ensureExists(p, 'test')
  t.deepEqual(appStore.get(p), 'example glossary')
  appStore.ensureExists(['x', 'y', 'z', 0], {x: 1})
  t.deepEqual(appStore.get(['x', 'y', 'z']), [{x: 1}])
})

test('#has(key)', (t) => {
  t.deepEqual(appStore.has(['glossary', 'title']), true)
  t.deepEqual(appStore.has(['glossary', 'title', 'test']), false)
})

test('#merge(key, value)', (t) => {
  let p = ['m', 'x']
  appStore.set(p, {x: 1})
  t.deepEqual(appStore.get(p), {x: 1})
  appStore.merge(p, {y: 1})
  t.deepEqual(appStore.get(p), {x: 1, y: 1})
})

test('#coalesce(arrayOfKeys)', (t) => {
  t.deepEqual(appStore.coalesce([['z', 'x'], ['m', 'x'], ['m', 'y']]), {x: 1, y: 1})
})
