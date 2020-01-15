import commander from 'commander'
import json from '../package.json'

// Usage
commander
  .version(json.version)
  .usage('[options]')

// List
commander
  .command('list')
  .description('Lists all available projects')
  .action(() => {
    // TODO: Implement list
  })

// New
commander 
  .command('new <name>')
  .description('Setup new project')
  .action(() => {
    // TODO: Implement new
  })

// Add
commander 
  .command('add')
  .description('Setup current path as new project')
  .action(() => {
    // TODO: Implement add
  })

// Remove
commander 
  .command('remove <name>')
  .description('Remove project')
  .action(() => {
    // TODO: Implement add
  })

commander.parse(process.argv)

if (!process.argv.slice(2).length) {
  commander.outputHelp()
}
