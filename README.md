# PO-box ![PO-box version](https://img.shields.io/badge/version-v0.03-yellow.svg) ![PO-box license](https://img.shields.io/badge/license-MIT-yellow.svg)

## Table of Contents

- [Why](#why)
- [Installation](#installation)
  - [Dependencies](#dependencies)
  - [Setup Process](#setup-process)
- [Features](#features)
- [Project Structure](#project-structure)

#

## Why?

<br>

#### Trying to keep track of all of the projects you are working on, where they're saved, what resources they use, documentation, specific commands used to run them along with everything else can be a real pain. So I decided to solve this problem by creating a small application that sits in your computer’s system tray to help organize all of these into one easy to access place allowing you to get a project running and back working on it quickly.

- PO-box is a Cross platform system tray application for Linux, Windows and Mac that keeps Project files and resources organized and easily accessible. Resources that can be linked include files, bookmarks to specific websites useful for a project, command line commands for the project, also searching for and linking of specific desktop applications used for project to individual projects. All information is persisted in projects.db3 file created locally in respective platforms app data location. On linux this would be located in your user's `home/.config/po-box` directory.

<br>

<br>

#

## Installation

<br>

### Dependencies

- `Node`
  - tested with versions `14.15.4`, `14.16.1` and `14.17.0` on Ubuntu 20.04 and Mac, though other versions should work fine. You can check the version of Nodejs installed on your system from the command line by running
  ```sh
  node -v
  ```
  -Note: A great easy script to manage `Node` installations on linux is `nvm`. You can find it [here](https://github.com/nvm-sh/nvm)

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

- The resulting executables will be created in the `dist/` directory.
  On linux this will create an appimage and snap package.

#

### Features

- Drag and drop folders on main projects page `New Project` box to create a new project entry.
- Search for applications on system that are useful for a project and link them to individual projects.
  - Set which applications are to be automatically launched or launch them individually in projects directory by clicking on them.
- Add project relevant bookmarks to a project by entering url or drag and drop a bookmark/url on `New BookMark` box in a project's `Bookmarks` tab.
- Save project relevant commands for easy copy and paste for use later
- Drag and drop project relevant files on project's `New File` box in project's `Files` tab, such as documentation, images, cheatsheets ect for easy access later.
- Keep track of a project's progress with a to do list for individual projects.
- Files, Applications (IDEs for example) and Bookmarks can be set to be automatically launched with the press of a button from the main page of projects for quickly getting back to work on a project.
- Top Tabs
  - The tabs along the top of the application give access to resources from all projects to easily search without diving into each individual project.
  - Editing of resource attributes are also found in these tabs.
  - Code snippets can be saved with syntax highlighting per language to give you quick access to your favorite snippets.

#

### Project Structure

This project incorporates Electron, React, Redux and SQLite for the database.

- The front-end is located in the `src/` directory. This consists of React and Redux.
- The Electron/Node backend and db files are all locatated in the `public/` directory.
- The ipcApi Directory in `public/` contains what you could think of as endpoints which communicate with the database models in turn passing the data back to the front-end through interprocess communication. Electron uses `main` and `renderer` processes. More information on Electron's interprocess communication can be found in their api documentation [here](https://www.electronjs.org/docs/api)

#

### WIP:

Mac not 100% supported, application searching for Mac not supported.

#

<div style="text-align:center" >
<img src="pobox0421.gif" width="50%" >
</div>

## Author

**Roger Lee**

- Github: [@Rm-lee](https://github.com/Rm-lee)
- LinkedIn: [@roger-m-lee](https://linkedin.com/in/roger-m-lee)
