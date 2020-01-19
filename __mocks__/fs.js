const fs = jest.genMockFromModule('fs')

let fsExists = true
let fsError = null
let fsMockFiles = []

const __setExists = value => {
  fsExists = value
}
const __setError = message => {
  fsError = new Error(message)
  fsMockFiles = undefined
}

const __setMockFiles = files => {
  fsError = null
  fsMockFiles = files
}

const existsSync = filename => {
  return fsExists
}

const readdir = (directoryPath, callback) => {
  return callback(fsError, fsMockFiles)
}

const readFileSync = jest.fn().mockImplementation(filename => {
  if (fsError) {
    throw fsError
  }
  return JSON.stringify({
    name: 'project',
    path: '/user/project',
    command: 'yarn start'
  })
})

const unlink = jest.fn().mockImplementation((_, callback) => callback(fsError))

const writeFile = jest.fn().mockImplementation((_name, _data, _options, callback) => callback(fsError))

fs.__setError = __setError
fs.__setExists = __setExists
fs.__setMockFiles = __setMockFiles
fs.existsSync = existsSync
fs.readdir = readdir
fs.readFileSync = readFileSync
fs.unlink = unlink
fs.writeFile = writeFile

export default fs
