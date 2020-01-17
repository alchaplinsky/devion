import { list } from './list'
import { remove } from './remove'
import { run } from './run'

const resolve = (cmd) => {
  if (cmd.list) {
    list()
  } else if (cmd.delete) {
    remove(cmd.args[0])
  } else if (cmd.show) {
    // show
  } else if (cmd.edit) {
    // edit
  } else {
    run(cmd.args[0])
  }
}

export { resolve }
