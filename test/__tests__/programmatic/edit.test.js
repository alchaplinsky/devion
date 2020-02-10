import { edit } from 'programmatic/edit'
import childProcess, { spawn } from 'child_process'

const EDITOR = process.env.EDITOR
jest.mock('fs')
jest.mock('child_process')

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

    it('resolves', async () => {
      await expect(edit('devion')).resolves.toBe(undefined)
    })

    it('opens config file in editor', async () => {
      await edit('devion')
      expect(spawn).toBeCalledWith('vim', ['/home/test/.devion/projects/devion.json'])
    })

    describe('error while opening file', () => {
      beforeEach(() => {
        childProcess.__setError('no permissions')
      })
      it('rejects with error', async () => {
        await expect(edit('devion')).rejects.toStrictEqual(Error('no permissions'))
      })
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

    it('rejects with error', async () => {
      await expect(edit('devion')).rejects.toStrictEqual(Error('no_editor_env_variable'))
    })
  })
})
