# devion
> Command line tool for managing and running projects in development

[![CircleCI](https://circleci.com/gh/alchaplinsky/devion.svg?style=svg)](https://circleci.com/gh/alchaplinsky/devion)
![npm](https://img.shields.io/npm/v/devion?color=blue&label=npm%20verstion)
![npm](https://img.shields.io/npm/dt/devion?label=downloads)
[![Requirements Status](https://requires.io/github/alchaplinsky/devion/requirements.svg?branch=master)](https://requires.io/github/alchaplinsky/devion/requirements/?branch=master)

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
