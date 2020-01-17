import { create as _create } from '../actions'
import inquirer from 'inquirer'

const questions = [
  {
    type: 'input',
    name: 'path',
    message: 'What is you project location?'
  },
  {
    type: 'input',
    name: 'command',
    message: 'Command to run your project'
  }
]

const create = name => {
  inquirer.prompt(questions).then(answers => {
    _create(name, {
      name: name,
      path: answers.path,
      command: answers.command
    })
  })
}

export { create }
