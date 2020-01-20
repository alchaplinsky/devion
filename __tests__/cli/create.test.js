import inquirer from 'inquirer'

import { create } from 'cli/create'
import { create as _create } from 'actions/create'

jest.mock('actions/create')
jest.mock('inquirer')
console.log = jest.fn()

describe('#create', () => {
  afterEach(() => jest.clearAllMocks())

  beforeEach(async () => {
    inquirer.__setUserResponse({ path: '/home/test', command: 'yarn start' })
    await create('devion')
  })

  it('asks for project path', () => {
    expect(inquirer.prompt).toHaveBeenCalledWith([{
      message: 'What is you project location?',
      name: 'path',
      type: 'input'
    }, {
      message: 'Command to run your project',
      name: 'command',
      type: 'input'
    }])
  })

  it('calls create with user input argumenst', () => {
    expect(_create).toHaveBeenCalledWith('devion', {
      name: 'devion',
      path: '/home/test',
      command: 'yarn start'
    })
  })
})
