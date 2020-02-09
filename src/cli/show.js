import { show as _show } from 'programmatic'

const show = (name) => _show(name)
  .then(config => console.log(config))
  .catch(error => console.log(error.message))

export { show }
