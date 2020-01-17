import fs from 'fs'
import { spawn } from 'child_process'
import { configFile } from '../base'

const execute = data => {
  return spawn(data.command, [], {
    cwd: data.path,
    shell: true,
    stdio: 'inherit'
  })
}

const run = name => {
  const config = configFile(name)
  if (fs.existsSync(config)) {
    return execute(JSON.parse(fs.readFileSync(config)))
  }
  return false
}

export { run }
