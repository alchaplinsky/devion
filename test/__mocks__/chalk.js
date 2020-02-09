const chalk = jest.genMockFromModule('chalk')

chalk.gray = jest.fn().mockImplementation(value => value)
chalk.red = jest.fn().mockImplementation(value => value)
chalk.bold = jest.fn().mockImplementation(value => value)
chalk.yellow = jest.fn().mockImplementation(value => value)
chalk.cyan = jest.fn().mockImplementation(value => value)

export default chalk
