import { handleError } from './errors'
import { show as _show } from 'programmatic'

const show = (name) => _show(name)
  .then(config => console.log(config))
  .catch(error => handleError(name, error))

export { show }
