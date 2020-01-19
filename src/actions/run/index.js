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

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(config)) return reject(Error(`${name} does not exist`))
    try {
      execute(JSON.parse(fs.readFileSync(config)))
      return resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export { run }
