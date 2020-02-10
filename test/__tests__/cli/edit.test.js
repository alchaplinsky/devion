import { edit } from 'cli/edit'

const EDITOR = process.env.EDITOR
jest.mock('child_process')
console.log = jest.fn()

describe('#edit', () => {
  afterEach(() => jest.clearAllMocks())

  describe('EDITOR env variable is set', () => {
    beforeEach(() => {
      jest.resetModules()
      process.env.EDITOR = 'vim'
    })

    afterEach(() => {
      process.env.EDITOR = EDITOR
    })

    it('does not log any messages', async () => {
      await edit()
      expect(console.log).not.toBeCalled()
    })
  })

  describe('EDITOR env variable is not set', () => {
    beforeEach(() => {
      jest.resetModules()
      delete process.env.EDITOR
    })

    afterEach(() => {
      process.env.EDITOR = EDITOR
    })

    it('logs error messages', async () => {
      await edit()
      expect(console.log).toHaveBeenNthCalledWith(1, '▸  No default EDITOR is set')
    })
  })
})
