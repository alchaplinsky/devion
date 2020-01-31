import { create } from 'actions/create'
import fs from 'fs'

jest.mock('fs')

describe('#create', () => {
  afterEach(() => jest.clearAllMocks())

  describe('config file already exists', () => {
    beforeEach(() => fs.__setExists(true))

    it('rejected with error', async () => {
      await expect(create('project', 'DATA')).rejects.toStrictEqual(Error('project already exists'))
    })
  })

  describe('config file does not exist', () => {
    beforeEach(() => fs.__setExists(false))

    describe('successful file creation', () => {
      it('resolves', async () => {
        await expect(create('project', 'DATA')).resolves.toStrictEqual(true)
      })

      it('creates a file', async () => {
        await create('project', 'DATA')
        expect(fs.writeFile).toBeCalledWith(
          '/home/test/.devion/projects/project.json',
          '"DATA"',
          { flag: 'w' },
          expect.any(Function)
        )
      })
    })

    describe('unsuccessful file creation', () => {
      beforeEach(() => fs.__setError('no permission'))

      it('resolves', async () => {
        await expect(create('project', 'DATA')).rejects.toStrictEqual(Error('no permission'))
      })
    })
  })
})
