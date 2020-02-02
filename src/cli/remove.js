import chalk from 'chalk'
import { remove as _remove } from 'programmatic'

const remove = name => _remove(name).then(() => {
  console.log(
    chalk.yellow('Configuration for ') +
    chalk.bold(name) +
    chalk.yellow(' has been removed')
  )
}).catch(error => console.log(chalk.yellow(error.message)))

export { remove }
