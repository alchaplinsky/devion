import chalk from 'chalk'
import { remove as _remove } from '../actions'

const remove = name => {
  if (_remove(name)) {
    console.log(
      chalk.gray('Configuration for ') +
      chalk.bold(name) +
      chalk.gray(' has been removed')
    )
  } else {
    console.log(
      chalk.gray('Configuration for ') +
      chalk.bold(name) +
      chalk.gray(' does not exist')
    )
  }
}

export { remove }
