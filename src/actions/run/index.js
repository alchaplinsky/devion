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
    if (!fs.existsSync(config)) return reject(Error('not_found'))
    try {
      execute(JSON.parse(fs.readFileSync(config)))
        .on('error', error => reject(error))
        .on('close', code => resolve(code))
    } catch (error) {
      reject(error)
    }
  })
}

export { run }
