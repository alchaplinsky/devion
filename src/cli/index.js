import { list } from './list'
import { show } from './show'
import { remove } from './remove'
import { run } from './run'

const resolve = (cmd) => {
  if (cmd.list) {
    list()
  } else if (cmd.delete) {
    remove(cmd.delete)
  } else if (cmd.show) {
    show(cmd.show)
  } else if (cmd.edit) {
    // edit
  } else {
    if (cmd.args[0] === undefined) return
    run(cmd.args[0])
  }
}

export { resolve }
