import ClearX from '../src/clearx'

let Data = {
  todos: []
}

let Store = new ClearX(
  Data, 
  { 
    devtools: true,
    name: 'Todo Example App' 
  }
)

export default Store
