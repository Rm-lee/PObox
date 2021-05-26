# PO-box ![PO-box version](https://img.shields.io/badge/version-v0.03-yellow.svg) ![PO-box license](https://img.shields.io/badge/license-MIT-yellow.svg)

## Table of Contents

- [Why](#why)
- [Installation](#installion)
  - [Dependencies](#dependencies)
  - [Setup Process](#setup-process)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)

#

## Why?

<br>

### Cross platform system tray application for Linux and Windows that keeps Project files and resources organized and easily accessible. Users can drag and drop project folders onto application to start linking resources for said project. Resources that can be linked include, files ( if file is an image a thumbnail will be shown), bookmarks to specific websites needed for project, command line commands for the project and search and linking of specific desktop applications used for project. All information is stored in projects.db file created locally in respective platforms app data location.

<br>

<br>

#

## Installation

<br>

### Dependencies

- `Node`
  - tested with versions `14.15.4`, `14.16.1` and `14.17.0` on Ubuntu 20.04 though other versions should work fine. You can check your version installed from the command line by running
  ```sh
  node -v
  ```
  -note: A great easy script to manage `Node` installations on linux is `nvm`. You can find it [here](https://github.com/nvm-sh/nvm)

### Setup Process

- clone or download the repo to your local environment
- cd into the directory and install the node modules using npm

```sh
cd PObox
npm install
```

- once npm finishes installing the dependencies you can either run the application in dev mode if you would like to work on the application's development or build a standalone executable of the application.

The only feature not supported while running in dev mode is image previews in the application.

#

### Development Mode Usage

```sh
npm start
```

- When the application starts you will have its Icon sitting in your system tray.

### Build Standalone

```sh
npm run build
```

- The resulting executables will be created in the **dist/** directory.
  On linux this will create an appimage and snap image

#

### Usage

![](pobox0421.gif)

#

### Features

- Drag and drop folders on main projects page `New Project` box to add create a new project location.
- Search for applications on system that are useful for a project and link them to individual projects.
  - Set which applications are to be automatically launched or launch them individually in projects directory by clicking on them.
- drag and drop of bookmarks

#

### Project Structure

#

### WIP:

Mac not 100% supported, application searching for Mac not supported. Other minor bugs might be noticed.

## Author

**Roger Lee**

- Github: [@Rm-lee](https://github.com/Rm-lee)
- LinkedIn: [@roger-m-lee](https://linkedin.com/in/roger-m-lee)
