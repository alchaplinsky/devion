const childProcess = jest.genMockFromModule('child_process')

let cpError = null

const __setError = message => {
  cpError = new Error(message)
}

const spawn = jest.fn().mockImplementation(() => {
  if (cpError) {
    throw cpError
  }
  return true
})

childProcess.__setError = __setError
childProcess.spawn = spawn

export default childProcess

export { spawn }
