# Devion
#### One command to run all your projects in development

[![CircleCI](https://circleci.com/gh/alchaplinsky/devion.svg?style=svg)](https://circleci.com/gh/alchaplinsky/devion)
![npm](https://img.shields.io/npm/v/devion?color=blue&label=npm%20verstion)
![npm](https://img.shields.io/npm/dt/devion?label=downloads)
[![Requirements Status](https://requires.io/github/alchaplinsky/devion/requirements.svg?branch=master)](https://requires.io/github/alchaplinsky/devion/requirements/?branch=master)

Devion is a command line tool that allows you to run your projects via single command. You don't have to **cd** into your project directory and run all the commands required to spin up your project or open multiple **Terminal** windows to run multiple commands. Just add Project Configuration for **devion** and spend less time spinning up your project in development.

## Install
Install as a npm package:

```
npm i -g devion
```
or
```
yarn global add devion 
```

## Usage

#### list configurations

```
$ devion --list
```

#### add new project configuration
```
devion [project_name]
```

#### run project
```
devion [project_name]
```

#### remove project configuration
```
devion --delete [project_name]
```

#### display project configuration
```
devion --show [project_name]
```

#### help

```
$ devion --help
```


## License

MIT © Alex Chaplinsky
