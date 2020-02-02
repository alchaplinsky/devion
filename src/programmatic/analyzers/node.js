import fs from 'fs'
import path from 'path'

const command = (projectPath, file) => {
  return JSON.parse(
    fs.readFileSync(path.resolve(projectPath, file))
  ).scripts.start
}

export default { 'package.json': command }
