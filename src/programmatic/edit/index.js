import { spawn } from 'child_process'
import { configFile } from 'programmatic/base'

const edit = (name) => {
  return new Promise((resolve, reject) => {
    if (!process.env.EDITOR) return reject(Error('no_editor_env_variable'))

    spawn(process.env.EDITOR, [configFile(name)])
      .on('error', error => reject(error))
      .on('close', () => resolve())
  })
}

export { edit }
