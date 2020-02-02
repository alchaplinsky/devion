import fs from 'fs'
import { spawn } from 'child_process'
import { configFile } from 'programmatic/base'

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
  const config = configFile(name)

  if (!fs.existsSync(config)) throw Error('not_found')
  return execute(JSON.parse(fs.readFileSync(config)))
}

export { run }
