import { create as _create } from 'programmatic'
import { analyze } from 'programmatic/analyzers'
import inquirer from 'inquirer'

const create = name => {
  const config = {
    name: name,
    processes: [
      {
        path: null,
        start: null
      }
    ]
  }
  inquirer.prompt([{
    type: 'input',
    name: 'path',
    message: 'What is you project location?'
  }]).then(({ path }) => {
    config.processes[0].path = path
    return analyze(path)
  }).then(command => {
    return inquirer.prompt([{
      type: 'input',
      name: 'command',
      message: 'Command to run your project',
      default: command
    }])
  }).then(({ command }) => {
    config.processes[0].start = command
    _create(name, config)
  })
}

export { create }
