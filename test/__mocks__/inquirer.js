const inquirer = jest.genMockFromModule('inquirer')

let create = false
let path = null
let command = null

const __setUserResponse = options => {
  create = options.create || false
  path = options.path || null
  command = options.command || null
}

inquirer.prompt = jest.fn().mockImplementation(questions => {
  console.log(questions)
  if (questions[0].name === 'create') {
    return Promise.resolve({ create: create })
  } else if (questions[0].name === 'path') {
    return Promise.resolve({ path: path })
  } else if (questions[0].name === 'command') {
    return Promise.resolve({ command: command })
  }
})
inquirer.__setUserResponse = __setUserResponse

export default inquirer
