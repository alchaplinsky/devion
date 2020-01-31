const childProcess = jest.genMockFromModule('child_process')

let cpError = null
let closeCallback = null
let errorCallback = null

const __setError = message => {
  cpError = new Error(message)
}

function __setCallback (message, callback) {
  if (message === 'error') {
    errorCallback = callback
  } else {
    closeCallback = callback
  }
  return this
}

const spawn = jest.fn().mockImplementation(() => {
  if (cpError) {
    setTimeout(() => errorCallback(cpError), 50)
  } else {
    setTimeout(() => closeCallback(0), 50)
  }

  return {
    on: __setCallback
  }
})

childProcess.__setError = __setError
childProcess.spawn = spawn

export default childProcess

export { spawn }
