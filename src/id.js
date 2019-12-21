let counter = 0

let generate = () => {
  counter += 1
  return `clearx-${counter}`
}

export default generate
