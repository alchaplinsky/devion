import { handleError } from './errors'
import { edit as _edit } from 'programmatic'

const edit = (name) => _edit(name).catch(error => handleError(name, error))

export { edit }
