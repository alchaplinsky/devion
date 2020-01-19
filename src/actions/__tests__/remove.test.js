import { remove } from 'actions/remove'
import fs from 'fs'

jest.mock('fs')

describe('#remove', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('config file does not exist', () => {
    beforeEach(() => {
      fs.__setExists(false)
    })

    it('rejects with error', async () => {
      await expect(remove('devion')).rejects.toStrictEqual(Error('devion does not exist'))
    })
  })

  describe('config file exists', () => {
    beforeEach(() => {
      fs.__setExists(true)
    })

    describe('successful deletion', () => {
      it('resolves', async () => {
        await expect(remove('devion')).resolves.toBe(true)
      })

      it('deletes file', async () => {
        await remove('devion')
        expect(fs.unlink).toBeCalledWith('/home/test/.devion/apps/devion.json', expect.any(Function))
      })
    })

    describe('unsuccessful deletion', () => {
      beforeEach(() => {
        fs.__setError('no permissions')
      })

      it('rejects with error', async () => {
        await expect(remove('devion')).rejects.toStrictEqual(Error('no permissions'))
      })
    })
  })
})
