import fs from 'fs'
import path from 'path'

const command = (projectPath, file) => {
  const contents = fs.readFileSync(path.resolve(projectPath, file)).toString()
  if (contents.match(/gem ('|")rails('|")/)) {
    return 'bundle exec rails s'
  } else if (contents.match(/gem ('|")middleman('|")/)) {
    return 'bundle exec middleman start'
  } else if (contents.match(/gem ('|")hanami('|")/)) {
    return 'bundle exec hanami s'
  } else if (contents.match(/gem ('|")sinatra('|")/)) {
    return 'bundle exec rackup -p 3000'
  }
  return null
}
export default { Gemfile: command }
