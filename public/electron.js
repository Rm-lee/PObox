const electron = require("electron");
const { Tray, Menu, app } = electron;
const positioner = require("electron-traywindow-positioner");
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const ipc = electron.ipcMain;
const fs = require("fs");
const os = require("os");
const dialog = electron.dialog;
const { shell } = require("electron");

const { exec, spawn } = require("child_process");
const { todosAPI } = require(path.join(__dirname, "./ipcAPI/todoAPI"));
const { projectsAPI } = require(path.join(__dirname, "./ipcAPI/projectAPI"));
const { appsAPI } = require(path.join(__dirname, "./ipcAPI/appAPI"));
const { commandsAPI } = require(path.join(__dirname, "./ipcAPI/commandAPI"));
const { bookmarksAPI } = require(path.join(__dirname, "./ipcAPI/bookMarkAPI"));
const { filesAPI } = require(path.join(__dirname, "./ipcAPI/filesAPI"));
const { snippetsAPI } = require(path.join(__dirname, "./ipcAPI/snippetAPI"));
const sysos = os.platform();

//create db and run migrations
const db = require("./data/db");
if (!fs.existsSync(path.resolve(app.getPath("userData"), "projects.db3"))) {
  db.migrate.latest().then(function() {
    return db.seed.run();
  });
}

//openBrowser Link
ipc.on("openLink", (event, arg) => {
  if (sysos === "darwin") {
    if (arg.startsWith("https") === true) {
      shell.openExternal(arg);
    } else {
      shell.openItem(arg);
    }
  } else {
    shell.openItem(arg);
  }
});
//select dir of project with dialog
ipc.on("select-dirs", async (event, arg) => {
  const result = await dialog.showOpenDialog(window, {
    properties: ["openDirectory"]
  });
  event.sender.send("proj-selected", result.filePaths[0]);
});
//commands ipcAPIs
commandsAPI();

//bookmark ipc APIs
bookmarksAPI();

//files ipc APIs
filesAPI();

//snippet ipc APIs
snippetsAPI();

//apps ipc APIs
appsAPI();

//projects APIs
projectsAPI();
//todos APIs
todosAPI();

//define window and tray globaly
let window = undefined;

let mainWindow;
let iconPath;
let appTray = null;

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide();
  } else {
    showWindow();
  }
};
//create tray browser window
function createWindow() {
  window = new BrowserWindow({
    width: 490,
    height: 550,

    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: false,
    backgroundColor: "#312450",
    webPreferences: {
      devTools: false,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js")
    }
  });
  window.setAlwaysOnTop(true);
  window.loadURL(
    isDev
      ? "http://localhost:3000/"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}
const showWindow = () => {
  const trayBounds = appTray.getBounds();
  positioner.position(window, trayBounds);

  window.show();

  window.focus();
};
app.allowRendererProcessReuse = true;

app.on("ready", () => {
  iconPath = path.join(__dirname, "code.png");
  appTray = new Tray(iconPath);
  var contextMenu = Menu.buildFromTemplate([
    {
      label: "Show app",
      click: function() {
        toggleWindow();
      }
    },
    {
      label: "Quit",
      click: function() {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);

  appTray.on("click", function(event) {
    toggleWindow();
  });

  appTray.setContextMenu(contextMenu);

  createWindow();
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (appTray === null) {
    createWindow();
  }
});
