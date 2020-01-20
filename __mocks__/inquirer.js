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
  if (questions.length === 1) {
    return Promise.resolve({ create: create })
  } else {
    return Promise.resolve({ path: path, command: command })
  }
})
inquirer.__setUserResponse = __setUserResponse

export default inquirer
