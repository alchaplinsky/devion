import chalk from 'chalk'
import { remove as _remove } from '../actions'

const remove = name => _remove(name).then(() => {
  console.log(
    chalk.gray('Configuration for ') +
    chalk.bold(name) +
    chalk.gray(' has been removed')
  )
}).catch(error => console.log(error.message))

export { remove }
