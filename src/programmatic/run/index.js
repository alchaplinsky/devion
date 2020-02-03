import { spawn } from 'child_process'
import { readConfig } from 'programmatic/base'

const execute = data => {
  return data.processes.map(({ start, path }) => {
    return spawn(start, [], {
      cwd: path,
      shell: true,
      stdio: 'inherit'
    })
  })
}

const run = name => {
  return execute(readConfig(name))
}

export { run }
