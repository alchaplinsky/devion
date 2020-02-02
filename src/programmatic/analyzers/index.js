import fs from 'fs'
import ruby from './ruby'
import node from './node'

const analyzers = Object.assign({}, ruby, node)

const analyze = path => {
  const files = fs.readdirSync(path)
  const file = Object.keys(analyzers).find(file => files.includes(file))
  if (analyzers[file]) return analyzers[file].call(this, path, file)
  return null
}

export { analyze }
