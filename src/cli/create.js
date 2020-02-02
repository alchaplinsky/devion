import 'core-js/stable'
import 'regenerator-runtime/runtime'
import fs from 'fs'
import chalk from 'chalk'
import { create as _create } from 'programmatic'
import { analyze } from 'programmatic/analyzers'
import inquirer from 'inquirer'

const create = async (name) => {
  const config = {
    name: name,
    processes: [
      {
        path: null,
        start: null
      }
    ]
  }
  const path = await askForPath()
  const command = analyze(path)
  config.processes[0].path = path

  return inquirer.prompt([{
    type: 'input',
    name: 'command',
    message: 'Command to run your project',
    default: command
  }]).then(({ command }) => {
    config.processes[0].start = command
    return _create(name, config)
  })
}

const askForPath = async () => {
  const { path } = await inquirer.prompt([{
    type: 'input',
    name: 'path',
    message: 'What is you project location?'
  }])
  if (fs.existsSync(path)) return path
  console.log(chalk.yellow('No such file or directory ') + chalk.bold(`'${path}'`))
  return askForPath()
}

export { create }
