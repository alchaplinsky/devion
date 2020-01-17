import commander from 'commander'
import json from '../package.json'
import { setup } from './actions/base'
import { resolve } from './cli'

commander
  .version(json.version)
  .usage('[options]')

commander
  .arguments('[name]')
  .option('-l, --list')
  .option('-s, --show')
  .option('-e, --edit')
  .option('-d, --delete')
  .action((_, cmd) => {
    setup()
    resolve(cmd)
  })
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  commander.outputHelp()
}
